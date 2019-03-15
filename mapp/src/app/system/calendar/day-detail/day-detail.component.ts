import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, ChangeDetectionStrategy } from '@angular/core';
import { FullCalendarOptions, EventObject } from 'ngx-fullcalendar';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { AddCaleventComponent } from '../add-calevent/add-calevent.component';

@Component({
  selector: 'app-day-detail',
  templateUrl: './day-detail.component.html',
  styleUrls: ['./day-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayDetailComponent implements OnInit {

  @Input() day: Date;
  @Output() typeView = new EventEmitter<boolean>();
  @ViewChild('blockFormCalEvent', {read: ViewContainerRef}) blockFormCalEvent: ViewContainerRef;

  formForCalEvent: ComponentRef<AddCaleventComponent>;

  title: string;
  options: FullCalendarOptions;
  subscription: Subscription;
  isLoaded = false;
  isCaleventAdd = false;
  caleventProp: Date;
  editMode = false;
  events: EventObject[] =[{
    id: '1',
    title: 'title',
    allDay: false,
    start: '2019-03-13T15:00:00',
    end: '2019-03-13T18:00:00',
    className: 'low'
},
{ id: 'b', title: 'Friends coming round', start: '2019-03-13T18:00:00', end: '2019-03-13T23:00:00' }];

  constructor(private _resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.options = { 
        defaultDate: this.day,
        editable: true,
        fixedWeekCount: false,
        header: {
          left: 'prev,next today',
          center: '',
          right: 'month,agendaWeek'
        },
        droppable: true,
        allDaySlot: false
    };
    this.isLoaded = true;
    this.title = moment(this.day).format('MMMM Do YYYY');
 
  }

  onDatesRender(event: any): void{
    //console.log('render');
    //console.log(event);
    switch(event.info.view.type){
      case 'month':
        this.typeView.emit(false);
        break;
      case 'agendaWeek':
        this.title = 'Week of ' + event.info.view.title;
        break;
      default:
        this.title = moment(event.info.view.calendar.state.currentDate).format('MMMM Do YYYY');
    }
    this.isCaleventAdd = false;
  }

  private factory(): void {
    const formFactory = this._resolver.resolveComponentFactory(AddCaleventComponent);
    this.formForCalEvent = this.blockFormCalEvent.createComponent(formFactory);    
  }

  onDateClick(event: any): void {
    let itemAdded: EventObject;

    this.factory();

    this.formForCalEvent.instance.eventCalc.datefrom = event.date;
    this.formForCalEvent.instance.eventCalc.timefrom = event.date;
    this.formForCalEvent.instance.newItem.subscribe((el: EventObject) => {
      console.log(el);
      //itemAdded = el;
    });
    this.formForCalEvent.instance.onVisible.subscribe((el) => {
      this.formForCalEvent.destroy();
    });
    
  }

  onEventClick(model: any) {
    let elementForm = {
        title: model.event.title,
        allDay: model.event.allDay,
        datefrom: model.event.start,
        timefrom: model.event.start,
        timeto: model.event.end,
        importance: model.event.classNames[0]
    };
    //console.log(elementForm);

    this.factory();

    this.formForCalEvent.instance.eventCalc = elementForm;
    this.formForCalEvent.instance.newItem.subscribe((el: EventObject) => {
      console.log(el);
      //itemEdited = el;
    });
    this.formForCalEvent.instance.onVisible.subscribe((el: boolean) => {
      this.formForCalEvent.destroy();
    });
  }

  onNavLinkDayClick(event){
    this.title = moment(event.info.view.calendar.state.currentDate).format('MMMM Do YYYY');
  }

  closeForm(value: boolean): void {
    this.isCaleventAdd = value;
  }
}
