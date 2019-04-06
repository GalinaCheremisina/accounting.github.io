import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Category } from '../shared/models/category.model';
import { Bill } from '../shared/models/bill.model';
import { EventRecord } from '../shared/models/event.model';
import * as fromBudget from '../store/budget.reducers';
import * as CategoryAction from '../store/categories.actions';
import * as EventAction from '../store/events.actions';
import * as BillAction from '../store/bill.actions';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecordsComponent implements OnInit {

  dataFromStore$: Observable<{ categories: Category[]; catLength: boolean; bill: Bill; }>;

  constructor(private _store: Store<fromBudget.BudgetState>) { }

  ngOnInit() {
    this.dataFromStore$ = this._store.select('budget')
                              .pipe(
                                map((value: fromBudget.BudgetState) => {
                                  return {
                                    categories: value.categories.categories,
                                    catLength: value.categories.categories.length > 0,
                                    bill: value.bill.activeBill
                                  }
                                })
                              );
  }

  /**Add a new category */
  newCategoryAdded(category: Category): void {
    this._store.dispatch(new CategoryAction.AddCategory(category))
  }

  /**Change the category */
  categoryWasEdited(category: Category): void {
    this._store.dispatch(new CategoryAction.UpdateCategory(category));
  }
  
  /**Delete the category */
  categoryWasDeleted(id: string): void {
    this._store.dispatch(new CategoryAction.DeleteCategory(id));
  }

  billWasUpdeted(bill: Bill): void {
    this._store.dispatch(new BillAction.UpdateBill(bill));
  }

  onProblem(text: string): void {
    this._store.dispatch(new EventAction.Fail(text));
  }

  newEventAdded(event: EventRecord): void {
    this._store.dispatch(new EventAction.AddEvent(event));
  }
}
