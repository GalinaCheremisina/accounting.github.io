import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import 'rxjs/add/operator/withLatestFrom';
import * as firebase from 'firebase/app';

import { Category } from '../shared/models/category.model';
import * as CategoryActions from './categories.actions';
import * as EventsActions from './events.actions';
import * as MessageActions from '../../../store/message.actions';
import { switchMap, map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Injectable()
export class CategoryEffects{
  
    @Effect()
    categoriesGetAll = this.actions$
        .pipe(
            ofType(CategoryActions.GET_CATEGORIES),
            switchMap(() => {
                return firebase.firestore().collection('users')
                    .doc('VWFdtIDHYiyExU71y8y0')
                    .collection('category')
                    .get()
            }),
            map((querySnapshot: firebase.firestore.QuerySnapshot) => {
                    let categories: Category[] = [];
                    querySnapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
                        const cat = {
                            name: doc.data().name,
                            capacity: doc.data().capacity,
                            id: doc.id
                        }
                        categories.push(cat);
                    });
                return {
                    type: CategoryActions.SET_CATEGORIES,
                    payload: categories
                };
                }),
            catchError(() => {
                return of({
                    type: CategoryActions.SET_CATEGORIES,
                    payload: []
                })
            })
        );

    @Effect()
    categoryUpdate = this.actions$
        .pipe(
            ofType(CategoryActions.UPDATE_CATEGORY),
            map((action: CategoryActions.UpdateCategory)=>{
                return action.payload;
            }),
            switchMap((payload: Category) => {
                const updatedCategory: any = {
                    name: payload.name,
                    capacity: payload.capacity,
                };
                
                return fromPromise( firebase.firestore().collection('users')
                    .doc('VWFdtIDHYiyExU71y8y0')
                    .collection('category')
                    .doc(payload.id)
                    .set(updatedCategory))
            }),
            mergeMap(() => {
                return [
                    {
                      type: MessageActions.SUCCESS,
                      payload: {
                        type: 'SUCCESS',
                        text: 'Category was updated'
                      }
                    }
                  ];
            })
        );

    @Effect()
    addCategory = this.actions$
        .pipe(
            ofType(CategoryActions.ADD_CATEGORY),
            map((action: CategoryActions.AddCategory) => {
                return action.payload
            }),
            mergeMap((newCategory: Category) => {
                let obj: Category = newCategory;   
                return fromPromise( firebase.firestore().collection('users')
                                        .doc('VWFdtIDHYiyExU71y8y0')
                                        .collection('category')
                                        .add({
                                            name: newCategory.name,
                                            capacity: newCategory.capacity,
                                        })
                                )
                                .pipe(
                                    map((value: firebase.firestore.DocumentReference) => {
                                        return {
                                            name: newCategory.name,
                                            capacity: newCategory.capacity,
                                            id: value.id
                                        }
                                        }),
                                    mergeMap((obj: Category) => {
                                        return [
                                            {
                                            type: CategoryActions.SET_CATEGORY,
                                            payload: obj  
                                            },
                                            {
                                              type: MessageActions.SUCCESS,
                                              payload: {
                                                type: 'SUCCESS',
                                                text: 'Category was added'
                                              }
                                            }
                                        ]
                                    })
                                )
              })
        );
        
    @Effect()
        deleteCategory = this.actions$
            .pipe(
                ofType(CategoryActions.DELETE_CATEGORY),
                map((action: CategoryActions.DeleteCategory) => {
                    return action.payload
                }),
                mergeMap((caregoryId: string) => {
                    firebase.firestore().collection('users')
                    .doc('VWFdtIDHYiyExU71y8y0')
                    .collection('category')
                    .doc(caregoryId)
                    .delete();         
                    
                    return [
                        {
                        type: EventsActions.DELETE_EVENTS,
                        payload: caregoryId  
                        },
                        {
                        type: MessageActions.SUCCESS,
                        payload: {
                            type: 'SUCCESS',
                            text: 'Category was deleted'
                        }
                        }
                    ];
                  })
            );
            
    constructor(private actions$: Actions) {}
    
  }