import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Bill } from '../../shared/models/bill.model';

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input() bill:Bill;
  @Input() currency:any;

  @Output() newBill = new EventEmitter<Bill>();

  euro: number;
  rub: number;
  isUserHasBill = true;

  currencyType = [
    {type: 'USD', label: 'USD'},
    {type: 'EUR', label: 'EUR'},
    {type: 'RUB', label: 'RUB'}
  ];

  ngOnInit() {
    const {rates} = this.currency;
    this.euro = rates['EUR']*this.bill.value;
    this.rub = rates['RUB']*this.bill.value;
    if( this.bill.value === 0 ){
      this.isUserHasBill = false;
    }
  }

  onSubmit(formBill: NgForm){
    const {value} = formBill;
    const {rates} = this.currency;
    this.newBill.next({value: value.values, currency: value.currency, creator: null});
    this.euro = rates['EUR']*value.values;
    this.rub = rates['RUB']*value.values;
    this.isUserHasBill = true;
  }
}
