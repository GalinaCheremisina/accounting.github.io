import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { EventRecord } from '../models/event.model';
import { environment } from '../../../../environments/environment';

const BACKEND_URL = environment.apiUrl + "/event";

@Injectable()
export class EventService{

    constructor(private _http: HttpClient){}

    /**Get events */
    getEvents(): Observable<EventRecord[]> {
        return this._http.get<{message: string, events: EventRecord[]}>(BACKEND_URL)
            .map(result => result.events);
    }   

    /**Get event */
    getEvent(eventId: string): Observable<EventRecord> {
        return this._http.get<EventRecord>(BACKEND_URL + '/' + eventId);
    }

    /**Add event */
    addEvent(event:EventRecord): void {
        this._http.post<{message: string, events: EventRecord}>(BACKEND_URL, event)
            .subscribe();
    }

    /**Delete events */
    deleteEvents(categoryId: string): void{
        const queryParams = `?idCategory=${categoryId}`;
        this._http.delete(BACKEND_URL + queryParams).subscribe();
      }
}