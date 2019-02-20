import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Archive } from '../../shared/models/archive.model';
import * as fromBudget from '../../store/budget.reducers';

@Component({
  selector: 'app-detail-archive',
  templateUrl: './detail-archive.component.html',
  styleUrls: ['./detail-archive.component.scss']
})
export class DetailArchiveComponent implements OnInit {

  archive: Archive;
  isLoaded = false;
  chartData = [];

  rows = [];
  columns = [
    { name: 'Name',
      prop: 'name' },
    { name: 'Total',
      prop: 'cost' },
    { name: 'Capacity',
      prop: 'amount' }
  ];

  constructor(
    private _route: ActivatedRoute,
    private _store: Store<fromBudget.BudgetState>) { }

  ngOnInit() {
    Observable.combineLatest(
      this._route.params,
      this._store.select('budget')
    )
    .take(1)
    .subscribe((result: [Params, fromBudget.BudgetState]) => {
      this.archive = result[1].archive.arhives.find((value: Archive) => value.id===result[0].id);
      this.isLoaded = true;
      this.calculateChartData();
      this.rows = this.archive.info;
    });
  }
  
  /**ChartData */
  calculateChartData(): void {
    this.chartData = [];

    this.archive.info.forEach((categoryInfo) => {
      this.chartData.push({
                      name: categoryInfo.name.toUpperCase(),
                      value: categoryInfo.cost
                    }
                    );
    });
  }


}
