import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import 'rxjs/add/operator/withLatestFrom';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase/app';

import { Category } from '../shared/models/category.model';
import * as CategoryActions from './categories.actions';
import * as fromCategory from './categories.redusers';
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

    @Effect({dispatch: false})
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
                }
                firebase.firestore().collection('users')
                    .doc('VWFdtIDHYiyExU71y8y0')
                    .collection('category')
                    .doc(payload.id)
                    .set(updatedCategory);
                return of(payload);
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
                                    switchMap((obj: Category) => {
                                        return of({
                                            type: CategoryActions.SET_CATEGORY,
                                            payload: obj  
                                        })
                                    })
                                )
              })
        );
        
    @Effect({dispatch: false})
        deleteCategory = this.actions$
            .pipe(
                ofType(CategoryActions.DELETE_CATEGORY),
                map((action: CategoryActions.DeleteCategory) => {
                    return action.payload
                }),
                switchMap((caregoryId: string) => {
                    firebase.firestore().collection('users')
                    .doc('VWFdtIDHYiyExU71y8y0')
                    .collection('category')
                    .doc(caregoryId)
                    .delete();         
                    
                    return of(caregoryId);
                  })
            );
            
    constructor(private actions$: Actions) {}
    
  }