import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Bill } from '../shared/models/bill.model';
import { BillService } from '../shared/services/bill.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit,OnDestroy {

  private subscription: Subscription;
  private subCreateBill: Subscription;
  bill: Bill;
  currency: any;
  dateOfCurrency: Date;
  isLoaded = false;

  constructor(private _billService: BillService) {}

  ngOnInit() {
    this.subscription = Observable.combineLatest(
      this._billService.getBill(),
      this._billService.getCurrency()
    ).subscribe((data:[Bill,any])=>{
        this.bill = data[0];
        this.currency = data[1];
        this.dateOfCurrency = new Date(this.currency['timestamp'] * 1000);
        this.isLoaded = true;
    });
  }

  newBill(bill: Bill): void {
    this.subCreateBill = this._billService.createBill(bill)
      .subscribe((bill: Bill)=>{
        this.bill = bill;
      })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    if(this.subCreateBill) this.subCreateBill.unsubscribe();
  }
}
