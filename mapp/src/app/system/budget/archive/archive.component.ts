import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

import * as fromBudget from '../store/budget.reducers';
import * as ArchiveActions from '../store/archive.action';
import { Archive } from '../shared/models/archive.model';
import { Category } from '../shared/models/category.model';
import { EventRecord } from '../shared/models/event.model';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit, OnDestroy {

  archives: Archive[] = [];
  categories: Category[] = [];
  events: EventRecord[] = [];

  subscription: Subscription;
  date = new Date();

  constructor(private _store: Store<fromBudget.BudgetState>) { }

  ngOnInit() {
    this._store.dispatch(new ArchiveActions.GetArchive());
    this.subscription = this._store.select('budget')
        .subscribe((value: fromBudget.BudgetState) =>{
          this.archives = value.archive.arhives;
          this.categories = value.categories.categories;
          this.events = value.events.events;
        })
  }

  private categoryCost(category: Category, type: string = 'outcome'){
    return this.events
              .filter((event: EventRecord) => event.category===category.id && event.type===type)
              .reduce((cost,event) =>{
                cost += event.amount;
                return cost;
              }, 0);
  }

  onAddArchive(){
    const dayfrom = moment(this.events[0].date,'DD.MM.YYYY').format('DD.MM.YYYY');
    const daytoday = moment(this.date).format('DD.MM.YYYY');
    const archiveID = moment(this.events[0].date,'DD.MM.YYYY').format('DDMMYYYY') + moment(this.date).format('DDMMYYYYDDMMYYYYHHmmss')
    const coop = this.categories.map((category: Category) => {
                  return {
                    name: category.name,
                    amount: category.capacity,
                    cost: this.categoryCost(category)
                  }
                  });
    const outcome = coop.reduce((total,value) => {
                         total += value.cost;
                         return total;
                        }, 0);
    const income = this.categories.reduce((total,value) => {
                      total += this.categoryCost(value,'income');
                      return total;
                    },0);
    const arc: Archive = {
                info: coop,
                income: income,
                outcome: outcome,
                datefrom: dayfrom,
                dateto: daytoday,
                id: archiveID
              };

    this._store.dispatch(new ArchiveActions.AddArchive(arc));
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
