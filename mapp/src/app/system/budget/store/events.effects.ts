import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import 'rxjs/add/operator/withLatestFrom';
import { switchMap, map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { EventRecord } from '../shared/models/event.model';
import * as EventsActions from './events.actions';
import * as MessageActions from '../../../store/message.actions';
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
                        mergeMap((obj: EventRecord) => {
                            return [
                                {
                                    type: EventsActions.SET_EVENT,
                                    payload: obj  
                                },
                                {
                                  type: MessageActions.SUCCESS,
                                  payload: {
                                    type: 'SUCCESS',
                                    text: 'Event was added'
                                  }
                                }
                            ]
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
                map((action: EventsActions.DeleteEvents) => {
                    return action.payload
                }),
                withLatestFrom(
                    this._store.select('budget')
                        .pipe(
                            map((state: fromBudget.BudgetState) => state.events.events)
                        )
                ),
                mergeMap(([action, state]) => {
                    let events: EventRecord[] = state;

                    if(action !== 'all') {
                        events = events.filter((element: EventRecord) => element.category === action)
                    }
                            
                    events.forEach((val) => {
                            console.log(val);
                            firebase.firestore().collection('users')
                                .doc('VWFdtIDHYiyExU71y8y0')
                                .collection('events')
                                .doc(val.id)
                                .delete();
                    });                      
                    return of({
                        type: EventsActions.DELETE_EVENTS_IN_STATE,
                        payload: action
                    });
                  })
            );

    @Effect() 
    failWithEvent = this.actions$
            .pipe(
                ofType(EventsActions.FAIL),
                map((action: EventsActions.Fail) => {
                    return action.payload
                }),
                mergeMap((action: string) => {         
                    return of({
                        type: MessageActions.ERROR,
                        payload: {
                            type: 'ERROR',
                            text: action
                          }
                    });
                  })
            );
            
    constructor(
        private actions$: Actions,
        private _store: Store<fromBudget.BudgetState>) {}
    
  }