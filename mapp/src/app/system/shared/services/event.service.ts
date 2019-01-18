import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';

import { EventRecord } from '../models/event.model';


export class EventService{ 

    private eventAll: EventRecord[] = [];
    private lastID: number;

    /**Initialization */
    initEvents(): void {
        firebase.database().ref('events').orderByChild('id')
        .once('value')
        .then((snapshot) => {
            this.eventAll = snapshot.val();
            this.lastID = 
                this.eventAll[this.eventAll.length-1] ? this.eventAll[this.eventAll.length-1].id : 0;
        });        
    }

    /**Get events */
    getEvents(): Observable<EventRecord[]> {
        return Observable.of(this.eventAll)
                .switchMap((events)=> 
                fromPromise(firebase.database().ref('events').orderByChild('id').once('value')))
                .map((snapshot)=> snapshot.val());
    }   

    /**Get event */
    getEvent(eventId:number): Observable<EventRecord> {
        let event:EventRecord;
        return Observable.of(event)
                .switchMap((events)=> 
                fromPromise(firebase.database().ref('/events/' + eventId).once('value')))
                .map((snapshot)=> snapshot.val());
    }

    /**Add event */
    addEvent(event:EventRecord): void {
        this.lastID ? this.lastID++ : 0;
        var updates = {};

        event = {...event,...{id:this.lastID}};
        updates['/events/' + this.lastID] = event;
        firebase.database().ref().update(updates)
          .catch(error => console.log(error));
    }
}