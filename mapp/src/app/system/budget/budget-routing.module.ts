import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { BudgetComponent } from './budget.component';
import { BillComponent } from './bill/bill.component';
import { HistoryComponent } from './history/history.component';
import { RecordsComponent } from './records/records.component';
import { PlanningComponent } from './planning/planning.component';
import { DetailComponent } from './history/detail/detail.component';
import { ArchiveComponent } from './archive/archive.component';
import { AuthGuard } from '../../shared/services/auth-guard.service';
import { DetailArchiveComponent } from './archive/detail-archive/detail-archive.component';

const routes:Routes = [
    {
      path: '',
      component: BudgetComponent,
      children: [
            { path: 'bill', component: BillComponent },
            { path: 'history', component : HistoryComponent},
            { path: 'history/:id', component: DetailComponent},
            { path: 'planning', component : PlanningComponent},
            { path: 'records', component : RecordsComponent},
            { path: 'archive', component : ArchiveComponent},
            { path: 'archive/:id', component: DetailArchiveComponent}
          ]
    }
  ];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BudgetRoutingModule{}