import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { BillService } from '../shared/services/bill.service';
import { CategoriesService } from '../shared/services/categories.service';
import { EventService } from '../shared/services/event.service';
import { Bill } from '../shared/models/bill.model';
import { Category } from '../shared/models/category.model';
import { EventRecord } from '../shared/models/event.model';

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

  constructor(
    private _billService:BillService,
    private _categoryService:CategoriesService,
    private _eventService:EventService) { }

  ngOnInit() {
    this.subscription = Observable.combineLatest(
      this._billService.getBill(),
      this._categoryService.getCategories(),
      this._eventService.getEvents()
    ).subscribe((data:[Bill,Category[],EventRecord[]])=>{
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];
      this.isLoaded = true;
    })
  }

  /**Get cost of category */
  getCategoryCost(category:Category): number {
    const eventCategory = this.events
              .filter((event)=> event.category===category.id && event.type==='outcome');
    return eventCategory.reduce((total,event)=>{
        total += event.amount;
        return total;
    },0);
  }

  /**Get a percent */
  private getPercent(cat:Category): number {
    const percent = (this.getCategoryCost(cat)*100)/cat.capacity;
    return (percent < 100) ? percent : 100;
  }

  /**Get all percent */
  getCategoryPercent(cat:Category): string {
    return this.getPercent(cat)+'%';
  }

  /**Get class for progress block */
  getCategoryColor(cat:Category): string {
    const percent = this.getPercent(cat);
    return (percent<60) ? 'success' : (percent>=100) ? 'danger' : 'warning'; 
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
