import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { CalendarComponent } from './calendar.component';
import { CalendarResolverService } from './shared/calendar-resolver.service';
import { DayDetailComponent } from './day-detail/day-detail.component';
import { CaleventListComponent } from './calevent-list/calevent-list.component';

const routes:Routes = [
{
    path: '',
    component: CalendarComponent,
    resolve: {
        messages: CalendarResolverService
    },
    children: [
        { path: '', component: CaleventListComponent},
        { path: 'day', component: DayDetailComponent}
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CalendarRoutingModule{}