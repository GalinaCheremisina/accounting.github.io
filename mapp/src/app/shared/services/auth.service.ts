import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Subject } from 'rxjs/Subject';

import { UserService } from './user.service';

@Injectable()
export class AuthService{
  
    token: string;
    activeUser$ = new Subject<boolean>();
  
    constructor(
        private _router: Router,
        private _userService: UserService) {}
  
    /**User is trying to register */
    signupUser(name: string,email: string, password: string): void {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          this._router.navigate(['/login'], {
            queryParams: {
              singUpOk: true
            }
          });
          this._userService.addUser({email:email,name:name,password:password});
          this._userService.isAuthenticated$.next(true);
        })
        .catch(
          error => this._userService.isAuthenticated$.next(false)
        );
    }
  
    /**User is trying to sing In */
    signinUser(email: string, password: string): void {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(response => {
            this._router.navigate(['/system', 'bill']);
            firebase.auth().currentUser.getIdToken()
              .then(
                (token: string) => {
                    this.token = token;
                    this._userService.getUserInfo(email);
                    this._userService.isAuthenticated$.next(true);
                });
        })
        .catch(
          error => this._userService.isAuthenticated$.next(false)
        );
    }
  
    /**User is log out */
    logout(): void {
      firebase.auth().signOut();
      this.token = null;
      this._userService.isAuthenticated$.next(false);
      this._userService.clearUser();
    }
  
    /**Get token after log in */
    getToken(): string  {
      firebase.auth().currentUser.getIdToken()
        .then(
          (token: string) => this.token = token
        );
      return this.token;
    }
  
    /**Check the user is authenticated */
    isAuthenticated(): boolean {
      return this.token != null;
    }
}