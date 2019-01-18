import { Component, OnInit, Input } from '@angular/core';

import { Bill } from '../../shared/models/bill.model';

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input() bill:Bill;
  @Input() currency:any;

  euro: number;
  rub: number;

  ngOnInit() {
    const {rates} = this.currency;
    this.euro = rates['EUR']*this.bill.value;
    this.rub = rates['RUB']*this.bill.value;
  }
}
