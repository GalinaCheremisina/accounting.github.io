import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map, mergeMap, switchMap, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import { of } from 'rxjs';

import * as AuthActions from './auth.actions';
import * as MessageActions from '../../store/message.actions';
import { User } from 'src/app/shared/models/user.model';


@Injectable()
export class AuthEffects{
    
    @Effect()
    authSingup = this.$actions
      .pipe(
        ofType(AuthActions.TRY_SIGNUP),
        map((action: AuthActions.TrySignup)=>{
            return action.payload;
        }),
        switchMap((authData: {useremail: string, username: string, password:string})=>{
            return fromPromise(
              firebase.auth().createUserWithEmailAndPassword(authData.useremail,authData.password))
                    .pipe(
                        map(()=> ({useremail: authData.useremail, username: authData.username})),
                        mergeMap((data: {useremail: string, username: string})=>{
                            return fromPromise(firebase.auth().currentUser.getIdToken())
                                    .pipe(
                                        map((tok)=> ({token: tok, info: data}))
                                    )
                        }),
                        mergeMap((value: {token: string, info: {useremail: string, username: string}})=>{
                            return [
                                {
                                    type:AuthActions.SIGNUP
                                },
                                {
                                    type: AuthActions.SET_TOKEN,
                                    payload: value.token
                                },
                                {
                                    type: AuthActions.CREATE_USER,
                                    payload: value.info
                                }
                            ];
                        }),
                        catchError((error) => {
                              return of({ type: MessageActions.ERROR, payload: error.message});
                        })
                    )
        }),
        );

    @Effect()
    authSignin = this.$actions
        .pipe(
          ofType(AuthActions.TRY_SIGNIN),
          map((action: AuthActions.TrySignin) => {
            return action.payload;
          }),
          switchMap((authData: {useremail: string, password: string}) => {
            return fromPromise(
              firebase.auth().signInWithEmailAndPassword(authData.useremail, authData.password))
              .pipe(
                map(() => ({useremail: authData.useremail})),
                  mergeMap((data: {useremail: string}) => {
                    return fromPromise(firebase.auth().currentUser.getIdToken())
                              .pipe(
                                map((tok) => ({token: tok, info: data})),
                              );
                  }),          
                  mergeMap((value: {token: string, info: {useremail: string}}) => {
                    this._router.navigate(['/system']);
                    return [
                      {
                        type: AuthActions.SIGNIN
                      },
                      {
                        type: AuthActions.SET_TOKEN,
                        payload: value.token
                      },
                      {
                        type: AuthActions.GET_USER,
                        payload: value.info.useremail
                      }
                    ];
                  }),
                catchError((error) => {
                      return of({ type: MessageActions.ERROR, payload: error.message});
                })
              )
          }));
          
    @Effect()
    getUser = this.$actions
        .pipe(
          ofType(AuthActions.GET_USER),
          map((action: AuthActions.GetUser) => {
            return action.payload;
          }),
          switchMap((emails: string) => {
            return fromPromise(firebase.firestore().collection('users').where("email", "==", emails).get())
          }),
          switchMap((querySnapshot: firebase.firestore.QuerySnapshot) => {
            let user: User;
            querySnapshot.forEach(function(doc) {
                user = {
                    name: doc.data().name,
                    email: doc.data().email,
                    id: doc.id
                };
            });
            return of(user);
          }),
          mergeMap((user: User) => {
              return [{
                type: AuthActions.SET_USER,
                payload: user
              }]
          })
        );
          
    @Effect()
    createUser = this.$actions
        .pipe(
          ofType(AuthActions.CREATE_USER),
          map((action: AuthActions.CreateUser) => {
            return action.payload;
          }),
          switchMap((data: {useremail: string, username: string}) => {

            firebase.firestore().collection('users-list').add({ email: data.useremail });
            
            return fromPromise(firebase.firestore().collection('users').add({
            name: data.username,
            email: data.useremail })
            )
            .pipe(
              map((value) => {
                let obj = {
                  docRef: value.id,
                  info: data
                }
                return obj;
              })
            )
          }),
          switchMap((result: {docRef: string, info: {useremail: string, username: string}}) => {

            let user = {
                email: result.info.useremail,
                name: result.info.username,
                id: result.docRef
            }
            let UserID = result.docRef;

            firebase.firestore().collection('users')
                .doc(UserID)
                .collection('bill')
                .doc('first')
                .set({
                    value: 0,
                    currency: "USD"
                });

            return of(user);
          }),
          mergeMap((user: User) => {
              this._router.navigate(['/system']);
              return [{
                type: AuthActions.SET_USER,
                payload: user
              }]
          })
        );    
        

    @Effect({dispatch: false})
    authLogout = this.$actions
    .pipe(
      ofType(AuthActions.LOGOUT)
    )
    .do(() => { this._router.navigate(['/']);});

    constructor(private $actions: Actions, private _router: Router) {}
}