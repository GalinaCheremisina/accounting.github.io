import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';
import { EventObject } from 'ngx-fullcalendar';
import { Store } from '@ngrx/store';

import * as fromEvents from '../store/eventscalendar.redusers';
import * as CalendarActions from '../store/eventscalendar.actions';
import { Router } from '@angular/router';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-add-calevent',
  templateUrl: './add-calevent.component.html',
  styleUrls: ['./add-calevent.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class AddCaleventComponent implements OnInit {
  
  eventCalc = {
    id: null,
    title: '',
    allDay: false,
    datefrom: new Date(),
    timefrom: new Date(),
    timeto: null,
    importance: ''
  };
  onVisible = new EventEmitter<boolean>();
  addForm: FormGroup;
  isAllDay = false;
  importance = [
    {type: 'l', label: 'low'},
    {type: 'av', label: 'average'},
    {type: 'р', label: 'high'} 
  ];

  constructor(
    private _store: Store<fromEvents.EventsCalendarState>,
    private _router: Router) { }

  ngOnInit() {
    this.addForm = new FormGroup({
      title: new FormControl(this.eventCalc.title),
      allDay: new FormControl(this.eventCalc.allDay),
      datefrom: new FormControl(moment(this.eventCalc.datefrom)),
      timefrom: new FormControl(moment(this.eventCalc.timefrom).format('HH:mm')),
      timeto: new FormControl(this.eventCalc.timeto ? moment(this.eventCalc.timeto).format('HH:mm') : moment(this.eventCalc.timefrom).add(1,'hours').format('HH:mm')),
      importance: new FormControl(
        this.eventCalc.importance ? this.importance.find(el => el.label === this.eventCalc.importance).type : this.importance[0].type )
    });
  }

  get canDelete() {
    return !!this.eventCalc.id;
  }

  closeForm(): void {
    this.onVisible.emit(false);
  }

  deleteEvent() {
    this._store.dispatch(new CalendarActions.DeleteCalEvent(this.eventCalc.id));
    this.onVisible.emit(false);
    this._router.navigate(['system','calendar']);
  }

  onSubmit(addForm: NgForm): void {
    
    let start = addForm.value.datefrom.format('YYYY-MM-DD')+'T'+addForm.value.timefrom;
    let end = addForm.value.datefrom.format('YYYY-MM-DD')+'T'+addForm.value.timeto;
    let className: string;
    let allDay = false;

    if (addForm.value.importance) {
      className = this.importance.find(el => el.type === addForm.value.importance).label;
    } else {
      className = this.importance[0].label;
    }

    if(addForm.value.allDay) {
      allDay = true;
      start = addForm.value.datefrom.format('YYYY-MM-DD')+'T00:00';
      end = addForm.value.datefrom.format('YYYY-MM-DD')+'T23:55';
    }
    
    if(moment(addForm.value.timefrom,'HH:mm').isAfter(moment(addForm.value.timeto,'HH:mm'))) {
      start = addForm.value.datefrom.format('YYYY-MM-DD')+'T'+addForm.value.timeto;
      end = addForm.value.datefrom.format('YYYY-MM-DD')+'T'+addForm.value.timefrom;
    } else if(moment(addForm.value.timefrom,'HH:mm').isSame(moment(addForm.value.timeto,'HH:mm'))) {
      end = addForm.value.datefrom.format('YYYY-MM-DD') + 'T' + moment(addForm.value.timefrom,'HH:mm').add(5,'m').format('HH:mm');
    }

    const item: EventObject = {
      id: this.eventCalc.id ? this.eventCalc.id : null,
      start,
      end,
      title: addForm.value.title,
      allDay,
      className    
    }
    
    if(item.id) {
      this._store.dispatch(new CalendarActions.UpdateCalEvent(item));
    } else {
      this._store.dispatch(new CalendarActions.AddCalEvent(item));
    }
    
    this.onVisible.emit(false);
    this._router.navigate(['system','calendar']);
  }

  onCahgeAllDay(el): void {
    const {checked} = el;
    this.isAllDay = checked;
  }

  timeFromChange(time: string, type: string): void {
    let tik: moment.Moment;
    const timeTo = moment(this.addForm.get('timeto').value,'HH:mm');
      
    if( type==='up' ){
      tik = moment(time,'HH:mm').add(5,'m');
    } else{
      tik = moment(time,'HH:mm').add(-5,'m');
    }
    
    this.addForm.patchValue({timefrom: tik.format('HH:mm')}); 
    if( moment(tik).isAfter(timeTo) || moment(tik).isSame(timeTo) ){
      this.addForm.patchValue({timeto: tik.add(1,'h').format('HH:mm')});      
    }
  }

  timeToChange(time: string, type: string): void {
    let tik: string;
    const timeFrom = moment(this.addForm.get('timefrom').value,'HH:mm');
      
    if( type==='up'){
      if(moment(time,'HH:mm').add(5,'m').isAfter(timeFrom)) {
        tik = moment(time,'HH:mm').add(5,'m').format('HH:mm');
      } else {
        tik = moment(time,'HH:mm').format('HH:mm');
      }
    } else {
      if(moment(time,'HH:mm').add(-5,'m').isAfter(timeFrom)) {
        tik = moment(time,'HH:mm').add(-5,'m').format('HH:mm');
      } else {
        tik = moment(time,'HH:mm').format('HH:mm');
      }
    }
    
    this.addForm.patchValue({timeto: tik});
  }
}
