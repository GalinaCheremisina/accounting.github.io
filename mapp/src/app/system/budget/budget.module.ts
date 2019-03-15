import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../shared/shared.module';
import { BudgetRoutingModule } from './budget-routing.module';
import { MomentPipe } from './shared/pipes/moment.pipe';
import { SearchPipe } from './shared/pipes/search.pipe';

import { BillComponent } from './bill/bill.component';
import { BillCardComponent } from './bill/bill-card/bill-card.component';
import { CurrencyComponent } from './bill/currency/currency.component';
import { PlanningComponent } from './planning/planning.component';
import { RecordsComponent } from './records/records.component';
import { AddEventComponent } from './records/add-event/add-event.component';
import { AddCategoryComponent } from './records/add-category/add-category.component';
import { EditCategoryComponent } from './records/edit-category/edit-category.component';
import { HistoryComponent } from './history/history.component';
import { ChartComponent } from './history/chart/chart.component';
import { EventsComponent } from './history/events/events.component';
import { DetailComponent } from './history/detail/detail.component';
import { FilterComponent } from './history/filter/filter.component';
import { ArchiveComponent } from './archive/archive.component';
import { BudgetComponent } from './budget.component';
import { BillEffects } from './store/bill.effects';
import { reducers } from './store/budget.reducers';
import { CategoryEffects } from './store/categories.effects';
import { EventEffects } from './store/events.effects';
import { ArchiveEffects } from './store/archive.effects';
import { ListArchiveComponent } from './archive/list-archive/list-archive.component';
import { DetailArchiveComponent } from './archive/detail-archive/detail-archive.component';
import { InstrumentModule } from '../shared/instrument.module';

@NgModule({
    declarations:[
        BudgetComponent,
        BillComponent,
        BillCardComponent,
        CurrencyComponent,
        HistoryComponent,
        ChartComponent,
        EventsComponent,
        FilterComponent,
        DetailComponent,
        RecordsComponent,
        AddCategoryComponent,
        EditCategoryComponent,
        AddEventComponent,
        PlanningComponent,
        ArchiveComponent,
        ListArchiveComponent,
        DetailArchiveComponent,
        MomentPipe,
        SearchPipe
    ],
    imports:[
        CommonModule,
        SharedModule,
        InstrumentModule,
        BudgetRoutingModule,
        StoreModule.forFeature('budget', reducers),
        EffectsModule.forFeature([BillEffects,CategoryEffects,EventEffects,ArchiveEffects])
    ],
    providers:[]
})
export class BudgetModule{}