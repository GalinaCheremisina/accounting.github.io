import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

import { Category } from '../../shared/models/category.model';
import { EventRecord } from '../../shared/models/event.model';
import { EventService } from '../../shared/services/event.service';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.model';
import { Message } from 'src/app/shared/models/message.model';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {

  @Input() categories: Category[] = [];

  types = [
    {type : 'income', label : 'income'},
    {type : 'outcome', label : 'outcome'}
  ];
  message: Message;
  subscription: Subscription;

  constructor(
    private _eventService: EventService,
    private _billService: BillService) { }

  ngOnInit() {
    this.message = new Message('danger', '');
  }

  /**Show a message */
  private showMessage(text: string): void {
    this.message.text = text;
    window.setTimeout(() => this.message.text = '', 5000);
  }

  /**Submit form */
  onSubmit(form: NgForm): void {
    let {amount, category, type, description} = form.value;
    if(amount<0) amount*= -1;
    const categoryEvent: Category = this.categories.filter((value)=> value.id === category)[0];
    const newEvent = new EventRecord(
      +amount,
      category,
      description,
      type,
      moment().format('DD.MM.YYYY HH:mm:ss'),
      '',
      categoryEvent.name,
      categoryEvent.creator
    );
    
    this.subscription = this._billService.getBill()
      .subscribe((bill: Bill)=>{
          let value = 0;
          if(type === 'outcome'){
            if(amount > bill.value){
              this.showMessage(`На счету недостаточно средств. Вам не хватает ${amount - bill.value}`);
              return;
            } else {
              value = bill.value - amount;
            }
          } else {
            value = bill.value + amount;
          }
      this._billService.updateBill({
        id: bill.id,
        value: value,
        currency: bill.currency,
        creator: bill.creator        
      });
      this._eventService.addEvent(newEvent);
      form.setValue({
        amount: 1,
        description: ' ',
        type:'outcome',
        category: 0
      });
      });
  }

  ngOnDestroy(){
    if(this.subscription) this.subscription.unsubscribe();
  }
}
