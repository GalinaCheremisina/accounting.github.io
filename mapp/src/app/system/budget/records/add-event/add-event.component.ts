import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

import { Category } from '../../shared/models/category.model';
import { EventRecord } from '../../shared/models/event.model';
import { Bill } from '../../shared/models/bill.model';
import { Message } from 'src/app/shared/models/message.model';
import * as fromBudget from '../../store/budget.reducers';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEventComponent implements OnInit, OnDestroy {

  @Input() data$: Observable<fromBudget.BudgetState>;
  @Output() onUpdateBill = new EventEmitter<Bill>();
  @Output() onAddEvent = new EventEmitter<EventRecord>();

  types = [
    {type : 'income', label : 'income'},
    {type : 'outcome', label : 'outcome'}
  ];
  message: Message;
  categories: Category[];
  private subscription: Subscription;

  constructor(private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.subscription = this.data$.subscribe((value: fromBudget.BudgetState) => {
      this.categories = value.categories.categories;
      this._cdr.markForCheck();
      console.log('AddEventComponent subscribe');
    });
  }

  /**Show a message */
  private showMessage(text: string): void {
    this.message.text = text;
    window.setTimeout(() => this.message.text = '', 5000);
  }

  /**Submit form */
  onSubmit(form: NgForm): void {
    let {amount,category,type,description} = form.value;
    if(amount<0) amount*= -1;
    const catName = this.categories[category].name;
    const catId = this.categories[category].id;
    const event = new EventRecord(
      +amount, catId, description, type, moment().format('DD.MM.YYYY HH:mm:ss'),'',catName
    );
    
    this.data$
      .map((data: fromBudget.BudgetState) => {
        return data.bill.activeBill;
      })
      .take(1)
      .subscribe((bill:Bill)=>{
          let value = 0;
          if(type==='outcome'){
            if(amount>bill.value){
              this.showMessage(`There are not enough money in the account. You are missing ${amount - bill.value}`);
              return;
            }else{
              value = bill.value - amount;
            }
          }else{
            value = bill.value + amount;
          }

          this.onUpdateBill.emit({value, currency: 'USD', id: bill.id});
          this.onAddEvent.emit(event);

          form.setValue({
            amount: 1,
            description: ' ',
            type:'outcome',
            category: 0
          });
      });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
