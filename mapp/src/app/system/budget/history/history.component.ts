import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { EventRecord } from '../shared/models/event.model';
import { Category } from '../shared/models/category.model';
import * as fromBudget from '../store/budget.reducers';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  isLoaded = false;
  isFilterVisible = false;
  subscription: Subscription;

  categories: Category[] = [];
  events: EventRecord[] = [];
  filteredEvents: EventRecord[] = [];

  chartData = [];

  constructor(private _store: Store<fromBudget.BudgetState>) {}

  ngOnInit() {
    this.subscription = this._store.select('budget')
    .subscribe((data: fromBudget.BudgetState) => {
      this.categories = data.categories.categories;
      this.events = data.events.events;
      this.setOriginalEvents();
      this.calculateChartData();
      this.isLoaded = true;
    });
  }

  /**Function copies the original array of events */
  private setOriginalEvents(): void {
    this.filteredEvents = this.events.slice();
  }

  /**ChartData */
  calculateChartData(): void {
    this.chartData = [];

    this.categories.forEach((cat) => {
      const catEvent = this.filteredEvents.filter((e) => e.category === cat.id && e.type === 'outcome');
      this.chartData.push({
        name: cat.name.toUpperCase(),
        value: catEvent.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      });
    });
  }

  /**Change visibility of filter */
  private toggleFilterVisibility(dir: boolean): void {
    this.isFilterVisible = dir;
  }

  /**Open the filter */
  openFilter(): void {
    this.toggleFilterVisibility(true);
  }

  /**Processing the data from filter */
  onFilterApply(filterData): void {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    this.filteredEvents = this.filteredEvents
        .filter((e)=>{
          return filterData.types.indexOf(e.type)!== -1;
        })
        .filter((e)=>{
          return filterData.categories.indexOf(e.category.toString())!==-1;
        })
        .filter((e)=>{
          const momentDate = moment(e.date,'DD.MM.YYYY HH:mm:ss');
          return momentDate.isBetween(startPeriod,endPeriod);
        });
    this.calculateChartData();
  }

  /**Close the filter */
  onFilterCancel(): void {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
