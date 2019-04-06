import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';
import * as firebase from 'firebase/app';
import { EventObject } from 'ngx-fullcalendar';

import * as EventsCalendarActions from './eventscalendar.actions';
import * as MessageActions from '../../../store/message.actions';

@Injectable()
export class EventCalendarEffects{
  
    @Effect()
    eventsGetAll = this.actions$
        .pipe(
            ofType(EventsCalendarActions.GET_CAL_EVENTS),
            switchMap(() => {
                return fromPromise(firebase.firestore().collection('users')
                    .doc('VWFdtIDHYiyExU71y8y0')
                    .collection('calendar-events')
                    .orderBy('start')
                    .get())
            }),
            map(
                (querySnapshot: firebase.firestore.QuerySnapshot) => {
                    let events: EventObject[] = [];
                    querySnapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
                        let ev = {
                            id: doc.id,
                            title: doc.data().title,
                            allDay: doc.data().allDay,
                            start: doc.data().start,
                            end: doc.data().end,
                            className: doc.data().className
                        }
                        events.push(ev);
                    });
                return {
                    type: EventsCalendarActions.SET_CAL_EVENTS,
                    payload: events
                };
                }),
            catchError((error) => {
                return of({
                    type: EventsCalendarActions.SET_CAL_EVENTS,
                    payload: []
                })
            })
        );

    @Effect()
    addEvent = this.actions$
        .pipe(
            ofType(EventsCalendarActions.ADD_CAL_EVENT),
            map((action: EventsCalendarActions.AddCalEvent) => {
                return action.payload
            }),
            mergeMap((newEvent: EventObject) => {              
            return fromPromise(firebase.firestore().collection('users')
                                        .doc('VWFdtIDHYiyExU71y8y0')
                                        .collection('calendar-events')
                                        .add({
                                            title: newEvent.title,
                                            allDay: newEvent.allDay,
                                            start: newEvent.start,
                                            end: newEvent.end,
                                            className: newEvent.className
                                        }) 
                    )
                    .pipe(
                        map((value: firebase.firestore.DocumentReference) => {
                            return {
                                title: newEvent.title,
                                allDay: newEvent.allDay,
                                start: newEvent.start,
                                end: newEvent.end,
                                className: newEvent.className,
                                id: value.id 
                            }
                            }),
                        switchMap((obj: EventObject) => {
                            return [
                                {
                                type: EventsCalendarActions.SET_CAL_EVENT,
                                payload: obj  
                                },
                                {
                                  type: MessageActions.SUCCESS,
                                  payload: {
                                    type: 'SUCCESS',
                                    text: 'Event was added'
                                    }
                                }
                            ];
                        })
                    )
              })
        );

    @Effect()
    deleteEvent = this.actions$
            .pipe(
                ofType(EventsCalendarActions.DELETE_CAL_EVENT),
                map((action: EventsCalendarActions.DeleteCalEvent) => {
                    return action.payload
                }),
                switchMap((eventId: string) => {
                    firebase.firestore().collection('users')
                    .doc('VWFdtIDHYiyExU71y8y0')
                    .collection('calendar-events')
                    .doc(eventId)
                    .delete();         
                    
                    return of({
                                type: MessageActions.SUCCESS,
                                payload: {
                                    type: 'SUCCESS',
                                    text: 'Event was deleted'
                                    }
                                });
                  })
            );

    @Effect() 
    updateEvent = this.actions$
            .pipe(
                ofType(EventsCalendarActions.UPDATE_CAL_EVENT),
                map((action: EventsCalendarActions.UpdateCalEvent) => {
                    return action.payload
                }),
                switchMap((event: EventObject) => {
                    const updatedEvent: EventObject = {
                        title: event.title,
                        allDay: event.allDay,
                        start: event.start,
                        end: event.end,
                        className: event.className
                    }
                    firebase.firestore().collection('users')
                        .doc('VWFdtIDHYiyExU71y8y0')
                        .collection('calendar-events')
                        .doc('' + event.id)
                        .set(updatedEvent);
                    return of({
                        type: MessageActions.SUCCESS,
                        payload: {
                            type: 'SUCCESS',
                            text: 'Event was updated'
                            }
                        });
                  })
            );

    constructor(private actions$: Actions) {}
}