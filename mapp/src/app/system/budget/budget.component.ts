import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromBudget from './store/budget.reducers';
import * as CategoryAction from './store/categories.actions';
import * as EventAction from './store/events.actions';
import { GetBill, GetCurrency } from './store/bill.actions';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html'
})
export class BudgetComponent implements OnInit{

  constructor(
    private _route: Router,
    private _store: Store<fromBudget.BudgetState>){}

  ngOnInit(){
    this._store.dispatch(new GetBill());
    this._store.dispatch(new GetCurrency());
    this._route.navigate(['system','budget','bill']);
    this._store.dispatch(new CategoryAction.GetCategories());
    this._store.dispatch(new EventAction.GetEvents());
  }
}
