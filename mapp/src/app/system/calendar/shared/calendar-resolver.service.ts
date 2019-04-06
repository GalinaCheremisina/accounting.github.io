import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, mergeMap, take, skipWhile } from 'rxjs/operators';
import { Observable, of, EMPTY }  from 'rxjs';

import { EventObject } from 'ngx-fullcalendar';
import * as fromEvents from '../store/eventscalendar.redusers';
import * as CalendarActions from '../store/eventscalendar.actions';

@Injectable()
export class CalendarResolverService implements Resolve<EventObject[]>{
    constructor(private _store: Store<fromEvents.EventsCalendarState>) {
        this._store.dispatch(new CalendarActions.GetCalEvents());
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<EventObject[]> | Observable<never> {
        return this._store.select('calendar')
            .pipe(
                map((value: fromEvents.State) => value.events),
                skipWhile((events: EventObject[]) => events.length <= 0),
                take(1),
                mergeMap((events: EventObject[]) => {
                    if (events) {
                        return of(events);
                    } else { 
                      return EMPTY;
                    }
                  })
            );
    }
} 