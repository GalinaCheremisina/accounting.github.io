import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FullCalendarOptions, EventObject } from 'ngx-fullcalendar';
import * as moment from 'moment';

import * as fromEvents from '../store/eventscalendar.redusers';

@Component({
  selector: 'app-calevent-list',
  templateUrl: './calevent-list.component.html',
  styleUrls: ['./calevent-list.component.scss'], 
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaleventListComponent implements OnInit {

  options: FullCalendarOptions;
  events: EventObject[] = [];
  isLoaded = false;

  constructor(
    private _store: Store<fromEvents.State>,
    private _router: Router) {}
 
  ngOnInit() {
    this._store.select('calendar')
      .take(1)
      .pipe(
        map((value: fromEvents.State) => value.events)
      )
      .subscribe((evDay: EventObject[]) => {
        this.events = evDay;
        this.isLoaded = true;
      });

    this.options = { 
      defaultDate: new Date(),
      editable: true,
      fixedWeekCount: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek'
      },
      droppable: false,
      allDaySlot: false
    };
  }

  onDateClick(event: any): void {
      this._router.navigate(['system','calendar','day'], {queryParams: {'date': moment(event.dateStr).format('YYYY-MM-DD')}});
  }

  onEventClick(event: any): void {
    this._router.navigate(['system','calendar','day'], {queryParams: {'date': moment(event.event.start).format('YYYY-MM-DD')}});
  }
}
