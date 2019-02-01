import { Subject, Observable } from 'rxjs';

import { User } from '../models/user.model';

export class UserService{

  isAuthenticated$ = new Subject<boolean>();
  isAuthenticated = false;
  activeUser: User;

  getUserInfo(): User {
    return this.activeUser;
  }

  /**Clear the user */
  clearUser(): void {
    this.isAuthenticated$.next(false);
    this.activeUser = null;
  }

  /**Get user's status */
  getAuthStatus(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }
    
  /**Get user's status */
  getIsAuth(): boolean {
    return this.isAuthenticated;
  }
}