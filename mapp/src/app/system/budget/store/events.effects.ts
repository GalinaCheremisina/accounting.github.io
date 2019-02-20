import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import 'rxjs/add/operator/withLatestFrom';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase/app';

import { EventRecord } from '../shared/models/event.model';
import * as EventsActions from './events.actions';
import * as fromEvents from './events.redusers';
import { switchMap, map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';
import * as fromBudget from '../store/budget.reducers';

@Injectable()
export class EventEffects{
  
    @Effect()
    eventsGetAll = this.actions$
        .pipe(
            ofType(EventsActions.GET_EVENTS),
            switchMap(() => {
                return firebase.firestore().collection('users')
                    .doc('VWFdtIDHYiyExU71y8y0')
                    .collection('events')
                    .orderBy('date')
                    .get()
            }),
            map(
                (querySnapshot: firebase.firestore.QuerySnapshot) => {
                    let events: EventRecord[] = [];
                    querySnapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
                        let ev = {
                            amount: doc.data().amount,
                            category: doc.data().category,
                            description: doc.data().description,
                            type: doc.data().type,
                            date: doc.data().date,
                            catname: doc.data().catname,
                            id: doc.id
                        }
                        events.push(ev);
                    });
                return {
                    type: EventsActions.SET_EVENTS,
                    payload: events
                };
                }),
            catchError((error) => {
                return of({
                    type: EventsActions.SET_EVENTS,
                    payload: []
                })
            })
        );

    @Effect()
    addEvent = this.actions$
        .pipe(
            ofType(EventsActions.ADD_EVENT),
            map((action: EventsActions.AddEvent) => {
                return action.payload
            }),
            mergeMap((newEvent: EventRecord) => {              
            return fromPromise(firebase.firestore().collection('users')
                                        .doc('VWFdtIDHYiyExU71y8y0')
                                        .collection('events')
                                        .add({
                                            amount: newEvent.amount,
                                            category: newEvent.category,
                                            description: newEvent.description,
                                            type: newEvent.type,
                                            date: newEvent.date,
                                            catname: newEvent.catname
                                        }) 
                    )
                    .pipe(
                        map((value: firebase.firestore.DocumentReference) => {
                            return {
                                amount: newEvent.amount,
                                category: newEvent.category,
                                description: newEvent.description,
                                type: newEvent.type,
                                date: newEvent.date,
                                catname: newEvent.catname,
                                id: value.id
                            }
                            }),
                        switchMap((obj: EventRecord) => {
                            return of({
                                type: EventsActions.SET_EVENT,
                                payload: obj  
                            })
                        })
                    )
              })
        );

    @Effect({dispatch: false})
    deleteEvent = this.actions$
            .pipe(
                ofType(EventsActions.DELETE_EVENT),
                map((action: EventsActions.DeleteEvent) => {
                    return action.payload
                }),
                switchMap((eventId: string) => {
                    firebase.firestore().collection('users')
                    .doc('VWFdtIDHYiyExU71y8y0')
                    .collection('events')
                    .doc(eventId)
                    .delete();         
                    
                    return of(eventId);
                  })
            );

    @Effect()
    deleteEventsAll = this.actions$
            .pipe(
                ofType(EventsActions.DELETE_EVENTS),
                withLatestFrom(this._store.select('budget')),
                mergeMap(([action, state]) => {
                    state.events.events.forEach((val) => {
                                            firebase.firestore().collection('users')
                                            .doc('VWFdtIDHYiyExU71y8y0')
                                            .collection('events')
                                            .doc(val.id)
                                            .delete();
                    });                      
                    return of({
                        type: EventsActions.SET_EVENTS,
                        payload: []
                    });
                  })
            );

    constructor(
        private actions$: Actions,
        private _store: Store<fromBudget.BudgetState>) {}
    
  }