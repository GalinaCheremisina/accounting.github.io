import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Bill } from '../shared/models/bill.model';
import * as fromBudget from '../store/budget.reducers';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {

  bill: Bill;
  currency: any;
  dateOfCurrency: Date;
  isLoaded = false;

  constructor(private _store: Store<fromBudget.BudgetState>) {}

  ngOnInit() {
    this._store.select("budget")
          .subscribe((activeBill: fromBudget.BudgetState) => {
            this.bill = activeBill.bill.activeBill;
            if(activeBill.bill.currency){
              this.currency = activeBill.bill.currency;
              this.dateOfCurrency = new Date(this.currency['timestamp'] * 1000);
              this.isLoaded = true;
            }
          })
  }
}
