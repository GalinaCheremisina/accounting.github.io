import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { SystemComponent } from './system.component';
import { BillComponent } from './bill/bill.component';
import { HistoryComponent } from './history/history.component';
import { RecordsComponent } from './records/records.component';
import { PlanningComponent } from './planning/planning.component';
import { DetailComponent } from './history/detail/detail.component';
import { AuthGuard } from '../shared/services/auth-guard.service';

const routes:Routes = [
    {path:'', component: SystemComponent, canActivate:[AuthGuard], children:[
        {path: 'bill', component : BillComponent},
        {path: 'history', component : HistoryComponent},
        {path: 'history/:id', component: DetailComponent},
        {path: 'planning', component : PlanningComponent},
        {path: 'records', component : RecordsComponent}
    ]}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class SystemRoutingModule{}