import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FullCalendarOptions, EventObject } from 'ngx-fullcalendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit {

  options: FullCalendarOptions;
  events: EventObject[];
  dayChosen = false;
  propDay: Date;
 
  ngOnInit() {
    this.options = { 
      defaultDate: new Date(),
      editable: true,
      fixedWeekCount: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek'
      },
      droppable: true,
      allDaySlot: false
    }
 
    this.events = [
      { id: 'a', title: 'My Birthday', allDay: true },
      { id: 'b', title: 'Friends coming round', start: '2019-03-23T18:00:00', end: '2019-03-23T23:00:00' }
    ]
  }

  onDateClick(event: any): void {
    if(event.allDay){
      this.dayChosen = true;
      this.propDay = event.date;
    }
  }

  onEventClick(event: any) {
    console.log(event);
  }

  changeView(event: boolean): void{
    this.dayChosen = event;
  }

}
