import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { SystemComponent } from './system.component';
import { GoalsComponent } from './goals/goals.component';

const routes: Routes = [
{
    path: '',
    component: SystemComponent,
    children: [
            { path: 'budget', loadChildren:'./budget/budget.module#BudgetModule'},
            { path: 'calendar', loadChildren:'./calendar/calendar.module#CalendarModule', data: { preload: true } },
            { path: 'goals', component: GoalsComponent}
        ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemRoutingModule{}