import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Subject } from 'rxjs/Subject';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { UserService } from './user.service';
import { Observable, of } from 'rxjs';
import { ValueTransformer } from '@angular/compiler/src/util';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService{
  
    token: string;
    activeUser$ = new Subject<boolean>();
    db = firebase.firestore();
  
    constructor(
        private _router: Router,
        private _userService: UserService) {}

    /**Get token after log in */
    getT() {

/*
firebase.firestore().collection('users').doc(UserID).set()
  .then(function() {
    console.log("Collection added to Firestore!");
    var promises = [];
    promises.push(this.db.collection('users').doc(UserID).collection('Bill').doc($scope.accentDialect).set(accentDialectObject));
    promises.push(firebase.firestore().collection($scope.longLanguage + 'Words').doc($scope.word).collection('FunFacts').doc($scope.longLanguage).set(funFactObject));
    promises.push(firebase.firestore().collection($scope.longLanguage + 'Words').doc($scope.word).collection('Translations').doc($scope.translationLongLanguage).set(translationObject));
    Promise.all(promises).then(function() {
      console.log("All subcollections were added!");
    })
    .catch(function(error){
      console.log("Error adding subcollections to Firestore: " + error);
    });
  })
  .catch(function(error){
    console.log("Error adding document to Firestore: " + error);
  });
*/

    } 
    /**User is trying to register */
    signupUser(name: string,email: string, password: string): void {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          this._router.navigate(['/login'], {
            queryParams: {
              singUpOk: true
            }
          });
          this._userService.addUser({email:email,name:name});
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
          console.log(response);
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

        firebase.firestore().collection('users').where("email", "==", email)
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                      let user = {
                        name: doc.data().name,
                        email: email,
                        id: doc.id
                      };
                        console.log(user);
                    });
                }
                )

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