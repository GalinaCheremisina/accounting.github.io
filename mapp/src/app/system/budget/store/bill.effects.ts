import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/withLatestFrom';
import { switchMap, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Bill } from "../shared/models/bill.model";
import * as BillActions from './bill.actions';
import * as fromBill from './bill.redusers';

@Injectable()
export class BillEffects{
  
    @Effect()
    billFetch = this.actions$
        .pipe(
            ofType(BillActions.GET_BILL),
            switchMap(() => {
                return firebase.firestore().collection('users')
                    .doc('VWFdtIDHYiyExU71y8y0')
                    .collection('bill')
                    .doc('first')
                    .get()
            }),
            map((doc: firebase.firestore.QueryDocumentSnapshot) => {
                return {
                    type: BillActions.SET_BILL,
                    payload: {
                            value: doc.data().value,
                            currency: doc.data().currency
                            }
                };
                })
        );

    @Effect()
    billUpdate = this.actions$
        .pipe(
            ofType(BillActions.UPDATE_BILL),
            map((action: BillActions.UpdateBill)=>{
                return action.payload;
            }),
            switchMap((payload: Bill) => {
                let updatedBill: Bill = {
                    value: payload.value,
                    currency: payload.currency
                }
                firebase.firestore().collection('users')
                    .doc('VWFdtIDHYiyExU71y8y0')
                    .collection('bill')
                    .doc('first')
                    .set(updatedBill);
                return of(payload);
            }),
            map((updatedBill: Bill) => {
                return {
                        type: BillActions.SET_BILL,
                        payload: updatedBill
                    }
                })
        );

    @Effect()
    getCurrency = this.actions$
        .pipe(
            ofType(BillActions.GET_CURRENCY),
            switchMap(() => {
                return this._http.get(`https://openexchangerates.org/api/latest.json?app_id=58dc12228fa448bc9dcf34f00b6c6bc4`)
            }),
            map((carrencyArr: any) => {
                return {
                    type: BillActions.SET_CURRENCY,
                    payload: carrencyArr
                }
            })
        );
 /* 
    @Effect({dispatch: false})
    recipeStore = this.actions$
      .ofType(RecipeActions.STORE_RECIPES)
      .withLatestFrom(this._store.select('recipes'))
      .switchMap(([action, state]) => {
        const req = new HttpRequest('PUT', 'https://recipes-99c91.firebaseio.com/recipes.json', 
                                        state.recipes, {reportProgress: true});
        return this._httpClient.request(req);
      });
  */
    constructor(private actions$: Actions,
                private _http: HttpClient,
                private _store: Store<fromBill.BillState>) {}
    
  }