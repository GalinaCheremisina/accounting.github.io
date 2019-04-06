import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, ChangeDetectionStrategy } from '@angular/core';
import { FullCalendarOptions, EventObject } from 'ngx-fullcalendar';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AddCaleventComponent } from '../add-calevent/add-calevent.component';
import * as fromEvents from '../store/eventscalendar.redusers';

@Component({
  selector: 'app-day-detail',
  templateUrl: './day-detail.component.html',
  styleUrls: ['./day-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayDetailComponent implements OnInit {

  @ViewChild('blockFormCalEvent', {read: ViewContainerRef}) blockFormCalEvent: ViewContainerRef;

  formForCalEvent: ComponentRef<AddCaleventComponent>;

  day: string;
  title: string;
  options: FullCalendarOptions;
  isLoaded = false;
  events: EventObject[] = [];

  constructor(
    private _resolver: ComponentFactoryResolver,
    private _route: ActivatedRoute,
    private _router: Router,
    private _store: Store<fromEvents.State>) { }

  ngOnInit() {
    this._route
        .queryParamMap
        .pipe(
          map(params => params.get('date'))
        )
        .combineLatest(
          this._store.select('calendar')
          .pipe(
            map((value: fromEvents.State) => value.events)
          )
        )
        .pipe(
          map((value: [string, EventObject[]]) => {
            let day: string;
            value[0].length > 0 ? day = moment(value[0]).format('YYYY-MM-DD') : day = moment(new Date()).format('YYYY-MM-DD');
            
            const dateEvents = value[1].filter((event: EventObject) => 
                                      ~moment(event.start).format('YYYY-MM-DD').indexOf(day));
            return [day, dateEvents];
          })
        )
        .take(1)
        .subscribe((value: [string, EventObject[]]) => {
          this.day = value[0];
          this.events = value[1];
          this.isLoaded = true;
          this.title = moment(this.day).format('MMMM Do YYYY');
        });

    this.options = { 
        defaultDate: this.day,
        editable: true,
        fixedWeekCount: false,
        header: {
          left: '',
          center: '',
          right: 'month'
        },
        droppable: false,
        allDaySlot: false
    };
  }

  onDatesRender(event: any): void {
    if(event.info.view.type === 'month')
      this._router.navigate(['system','calendar']);
  }

  private factory(): void {
    const formFactory = this._resolver.resolveComponentFactory(AddCaleventComponent);
    this.formForCalEvent = this.blockFormCalEvent.createComponent(formFactory);    
  }

  onDateClick(event: any): void {

    this.factory();

    this.formForCalEvent.instance.eventCalc.datefrom = event.date;
    this.formForCalEvent.instance.eventCalc.timefrom = event.date;
    this.formForCalEvent.instance.onVisible.subscribe((el: boolean) => {
      this.formForCalEvent.destroy();
    });
  }

  onEventClick(model: any) {
    let elementForm = {
        id: model.event.id,
        title: model.event.title,
        allDay: model.event.allDay,
        datefrom: model.event.start,
        timefrom: model.event.start,
        timeto: model.event.end,
        importance: model.event.classNames[0]
    };

    this.factory();

    this.formForCalEvent.instance.eventCalc = elementForm;
    this.formForCalEvent.instance.onVisible.subscribe((el: boolean) => {
      this.formForCalEvent.destroy();
    });
  }
}
