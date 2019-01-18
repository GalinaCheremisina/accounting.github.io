import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';
import { BillService } from './shared/services/bill.service';
import { CategoriesService } from './shared/services/categories.service';
import { EventService } from './shared/services/event.service';
import { MomentPipe } from './shared/pipes/moment.pipe';
import { SearchPipe } from './shared/pipes/search.pipe';
import { DropDownDirective } from './shared/directives/dropdown.directive';

import { SystemComponent } from './system.component';
import { BillComponent } from './bill/bill.component';
import { HistoryComponent } from './history/history.component';
import { RecordsComponent } from './records/records.component';
import { PlanningComponent } from './planning/planning.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { BillCardComponent } from './bill/bill-card/bill-card.component';
import { CurrencyComponent } from './bill/currency/currency.component';
import { AddEventComponent } from './records/add-event/add-event.component';
import { AddCategoryComponent } from './records/add-category/add-category.component';
import { EditCategoryComponent } from './records/edit-category/edit-category.component';
import { ChartComponent } from './history/chart/chart.component';
import { EventsComponent } from './history/events/events.component';
import { DetailComponent } from './history/detail/detail.component';
import { FilterComponent } from './history/filter/filter.component';

@NgModule({
    declarations:[
        SystemComponent,
        BillComponent,
        HistoryComponent,
        RecordsComponent,
        PlanningComponent,
        SidebarComponent,
        HeaderComponent,
        DropDownDirective,
        BillCardComponent,
        MomentPipe,
        SearchPipe,
        CurrencyComponent,
        AddEventComponent,
        AddCategoryComponent,
        EditCategoryComponent,
        ChartComponent,
        EventsComponent,
        DetailComponent,
        FilterComponent
    ],
    imports:[
        CommonModule,
        SharedModule,
        SystemRoutingModule
    ],
    providers:[
        BillService,
        CategoriesService,
        EventService
    ]
})
export class SystemModule{}