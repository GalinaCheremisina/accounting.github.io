import * as firebase from 'firebase';
import { Subject } from 'rxjs';

import { User } from '../models/user.model';

export class UserService{

  isAuthenticated$ = new Subject<boolean>();
  activeUser$ = new Subject<User>();

  /**Get user's info*/
  getUserInfo(emailF:string): void {
    let userId:string;
    firebase.database().ref('users').orderByChild('email').equalTo(emailF)
    .on("child_added",(snapshot) => {
      userId = snapshot.key;

      firebase.database().ref('/users/' + userId).once('value')
      .then((snapshot) => this.activeUser$.next(snapshot.val()));
      });
  }

  /**Add a new user */
  addUser(user:User): void {
    const userKey = firebase.database().ref().child('users').push().key;
  
    var updates = {};
    updates['/users/' + userKey] = user;  
    firebase.database().ref().update(updates)
      .catch(error => console.log(error))
  }

  /**Clear the user */
  clearUser(): void {
    this.isAuthenticated$.next(false);
    this.activeUser$.next(null);
  }
}