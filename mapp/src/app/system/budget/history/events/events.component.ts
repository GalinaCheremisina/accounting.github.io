import { Component, Input } from '@angular/core';

import { EventRecord } from '../../shared/models/event.model';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent {

  @Input() categories:Category[] = [];
  @Input() events:EventRecord[] = [];
  
  searchValue = '';
  searchPlaceholder = 'Amount';
  searchField = 'amount';

  /**Get class for the event's block */
  getEventClass(event: EventRecord): any {
    return {
      'label':true,
      'label-danger': event.type ==='outcome',
      'label-success': event.type ==='income'
    }
  }

  /**Search is changed */
  changeFind(field: string): void {
    this.searchPlaceholder = field.charAt(0).toUpperCase() + field.slice(1);
    this.searchField = field;
    this.searchValue = '';
  }
}
