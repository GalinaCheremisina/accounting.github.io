import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as firebase from 'firebase';
import { of } from 'rxjs';
import { switchMap, mergeMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';

import * as ArchiveActions from './archive.action';
import * as EventsActions from './events.actions';
import * as MessageActions from '../../../store/message.actions';
import { Archive } from '../shared/models/archive.model';

@Injectable()
export class ArchiveEffects{

    @Effect()
    getArchives = this.action$
        .pipe(
            ofType(ArchiveActions.GET_ARCHIVE),
            switchMap(() => {
                return fromPromise(
                        firebase.firestore().collection('users')
                            .doc('VWFdtIDHYiyExU71y8y0')
                            .collection('archive')
                            .orderBy('datefrom')
                            .get())
                        .pipe(
                            map((doc: firebase.firestore.QuerySnapshot) => {
                                let archives: Archive[] = [];
                                doc.forEach((result) => {
                                    const archive = {
                                        info: result.data().info,
                                        income: result.data().income,
                                        outcome: result.data().outcome,
                                        datefrom: result.data().datefrom,
                                        dateto: result.data().dateto,
                                        id: result.id
                                    };
                                    archives.push(archive);
                                });
                                return archives;
                            }),
                            mergeMap((archives: Archive[]) => {
                                return of({
                                    type: ArchiveActions.SET_ARCHIVE,
                                    payload: archives
                                });
                            }),
                            catchError(() => {
                                return of({
                                    type: ArchiveActions.SET_ARCHIVE,
                                    payload: []
                                })
                            })
                        )
            })
        );
    
    @Effect()
    addArchive = this.action$
        .pipe(
            ofType(ArchiveActions.ADD_ARCHIVE),
            map((action: ArchiveActions.AddArchive) => action.payload),
            switchMap((archive: Archive) => {
                return fromPromise(firebase.firestore().collection('users')
                                    .doc('VWFdtIDHYiyExU71y8y0')
                                    .collection('archive')
                                    .doc(archive.id)
                                    .set({
                                        info: archive.info,
                                        income: archive.income,
                                        outcome: archive.outcome,
                                        datefrom: archive.datefrom,
                                        dateto: archive.dateto,
                                    }))
                        .pipe(
                            mergeMap(()=> [{
                                type: ArchiveActions.GET_ARCHIVE
                            },{
                                type: EventsActions.DELETE_EVENTS,
                                payload: 'all'
                            },
                            {
                              type: MessageActions.SUCCESS,
                              payload: {
                                type: 'SUCCESS',
                                text: 'Archive was added'
                              }
                            }])
                        )
            })
        );

    constructor(
        private action$: Actions){}
}