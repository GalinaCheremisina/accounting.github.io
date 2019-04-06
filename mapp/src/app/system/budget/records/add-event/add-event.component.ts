import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

import { Category } from '../../shared/models/category.model';
import { EventRecord } from '../../shared/models/event.model';
import { Bill } from '../../shared/models/bill.model';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEventComponent {

  @Input() categories: Category[];
  @Input() bill: Bill;

  @Output() onUpdateBill = new EventEmitter<Bill>();
  @Output() onAddEvent = new EventEmitter<EventRecord>();
  @Output() hasProblem = new EventEmitter<string>();

  types = [
    {type : 'income', label : 'income'},
    {type : 'outcome', label : 'outcome'}
  ];

  /**Submit form */
  onSubmit(form: NgForm): void {
    let {amount,category,type,description} = form.value;

    if(amount<0) amount*= -1;

    const event = new EventRecord(
      +amount, category, description, type, moment().format('DD.MM.YYYY HH:mm:ss'),'', this.categories.find(el => el.id === category).name
    );

    let value = 0;

    if(type==='outcome'){
      if(amount > this.bill.value){
        this.hasProblem.next(`There isn't enough money in the account. You are missing ${amount - this.bill.value}`);
        return;
      } else {
        value = this.bill.value - amount;
      }
    } else {
      value = this.bill.value + amount;
    }

    this.onUpdateBill.emit({value, currency: 'USD', id: this.bill.id});
    this.onAddEvent.emit(event);

    form.setValue({
      amount: 1,
      description: ' ',
      type:'outcome',
      category: this.categories[0].id
    });
  }
}
