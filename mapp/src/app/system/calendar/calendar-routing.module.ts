import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { CalendarComponent } from './calendar.component';

const routes:Routes = [
{
    path: '',
    component: CalendarComponent,
    children: [
            { path: 'qw', component: CalendarComponent,}
        ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CalendarRoutingModule{}