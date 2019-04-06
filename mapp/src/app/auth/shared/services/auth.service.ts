import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable} from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService{

    checkUser(email: string): Observable<boolean> {
      return fromPromise(
        firebase.firestore().collection('users-list').where("email", "==", email).get())
        .pipe(
          map((response: firebase.firestore.QuerySnapshot) => {
            let result: boolean = false;
            response.forEach(function(doc) {
              result = !!doc.data();
            });
            return result;
          })
        );
    }
}