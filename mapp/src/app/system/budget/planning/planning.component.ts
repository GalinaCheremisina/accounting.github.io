import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store'; 

import { Bill } from '../../shared/models/bill.model';
import { Category } from '../shared/models/category.model';
import { EventRecord } from '../shared/models/event.model';
import * as fromBudget from '../store/budget.reducers';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit, OnDestroy {

  isLoaded = false;
  bill: Bill;
  categories: Category[] = [];
  events: EventRecord[] = [];
  subscription: Subscription;

  constructor(private _store: Store<fromBudget.BudgetState>) { }

  ngOnInit() {
    this.subscription = this._store.select('budget')
    .subscribe((data: fromBudget.BudgetState) => {
      this.bill = data.bill.activeBill;
      this.categories = data.categories.categories;
      this.events = data.events.events;
      this.isLoaded = true;      
    });
  }

  /**Get cost of category */
  getCategoryCost(category: Category): number {
    const eventCategory = this.events
              .filter((event)=> event.category===category.id && event.type==='outcome');
    return eventCategory.reduce((total,event)=>{
        total += event.amount;
        return total;
    },0);
  }

  /**Get a percent */
  private getPercent(cat: Category): number {
    const percent = (this.getCategoryCost(cat)*100)/cat.capacity;
    return (percent < 100) ? percent : 100;
  }

  /**Get all percent */
  getCategoryPercent(cat: Category): string {
    return this.getPercent(cat)+'%';
  }

  /**Get class for progress block */
  getCategoryColor(cat: Category): string {
    const percent = this.getPercent(cat);
    return (percent<60) ? 'success' : (percent>=100) ? 'danger' : 'warning'; 
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
