import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'], 
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent {}
