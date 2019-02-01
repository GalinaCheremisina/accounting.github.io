import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { UserService } from './user.service';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

const BACKEND_URL = environment.apiUrl + "/user/";

@Injectable()
export class AuthService{
  
    private token: string;
    private tokenTimer: any;
    private userId: string;
  
    constructor(
        private _router: Router,
        private _http: HttpClient,
        private _userService: UserService) {}

    /**User is trying to register */
    signupUser(name: string, email: string, password: string): void {
        const authData: User = {email: email, password: password, name: name};
        this._http.post(BACKEND_URL + "signup", authData)
          .subscribe(response => {
            this._router.navigate(["/login"]);
          }, error =>{
            this._userService.isAuthenticated$.next(false);
          }); 
    }
  
    /**User is trying to sing In */
    signinUser(email: string, password: string): void {
        const authData = {email: email, password: password};
        this._http.post<{token: string, expiresIn: number, userId: string, userName: string}>(
          BACKEND_URL + "login",
          authData
          )
          .subscribe(response => {
            this.token = response.token;
            if(response.token){
              const user: User = {
                email: email,
                name: response.userName,
                password: null,
                id: response.userId
              };
              this._userService.activeUser = user;

              this.userId = response.userId;
              this._userService.isAuthenticated$.next(true);
              this._userService.isAuthenticated = true;

              const expiresInDuration = response.expiresIn;
              this.setAuthTimer(expiresInDuration);
              const now = new Date();
              const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
              this.saveAuthData(response.token, expirationDate, this.userId, response.userName);

              this._router.navigate(['/system', 'bill']);
            }
          }, error =>{
            this._userService.isAuthenticated$.next(false);
          });
    }
  
    /**User is log out */
    logout(): void {
      this.token = null;
      this._userService.isAuthenticated$.next(false);
      this._router.navigate(["/login"]);
      this._userService.clearUser();
      this.clearAuthData();
      this.userId = null;
    }

    autoAuthUser(): void {
      const authInformation = this.getAuthData();
      if (!authInformation) {
        return;
      }
      const now = new Date();
      const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
      if (expiresIn > 0) {
        this.token = authInformation.token;
        this.userId = authInformation.userId;
        const user: User = {
          email: null,
          name: authInformation.userName,
          password: null,
          id: authInformation.userId
        };
        this._userService.activeUser = user;
        this._userService.isAuthenticated = true;
        this._userService.isAuthenticated$.next(true);
        this.setAuthTimer(expiresIn / 1000);
      }
    }
  
    /**Get the token */
    getToken(): string {
      return this.token;
    }
  
    /**Get user's id */
    getUserId(): string {
      return this.userId;
    }
  
    private setAuthTimer(duration: number): void {
      this.tokenTimer = setTimeout(() => {
        this.logout();
      }, duration * 1000);
    }
  
    private saveAuthData(token: string, expirationDate: Date, userId: string, userName: string): void {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userName", userName);
      localStorage.setItem("expiration", expirationDate.toISOString());
    }
  
    private clearAuthData(): void {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("expiration");
    }
  
    private getAuthData(): {token: string, userId: string, userName: string, expirationDate: Date} {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const userName = localStorage.getItem("userName");
      const expirationDate = localStorage.getItem("expiration");
      if (!token || !expirationDate) {
        return;
      }
      return {
        token: token,
        userId: userId,
        userName: userName,
        expirationDate: new Date(expirationDate)
      }
    }
}