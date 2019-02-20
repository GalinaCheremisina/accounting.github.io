import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import { EventRecord } from '../../shared/models/event.model';
import * as fromBudget from '../../store/budget.reducers';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  event$: EventRecord;

  constructor(
    private _route:ActivatedRoute,
    private _store: Store<fromBudget.BudgetState>) {}

  ngOnInit() {
    this._route.params
      .take(1)
      .mergeMap((param: Params) => {
        return this._store.select('budget')
                  .map((data: fromBudget.BudgetState) => 
                          data.events.events.find((ev: EventRecord) => ev.id === param.id)
                      )
      })
      .subscribe((event:EventRecord)=> this.event$ = event );
  }

  /**Get class for the card's block */
  getClass(type:string): any {
    return {
      'card': true,
      'card-success': type === 'income',
      'card-danger': type === 'outcome'
    }
  }
}
