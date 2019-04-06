import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxFullCalendarModule } from 'ngx-fullcalendar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarRoutingModule } from './calendar-routing.module';
import { EventCalendarEffects } from './store/eventscalendar.effects';
import { eventsCalendarReduser } from './store/eventscalendar.redusers';

import { CalendarComponent } from './calendar.component';
import { DayDetailComponent } from './day-detail/day-detail.component';
import { AddCaleventComponent } from './add-calevent/add-calevent.component';
import { CaleventListComponent } from './calevent-list/calevent-list.component';
import { InstrumentModule } from '../shared/instrument.module';
import { CalendarResolverService } from './shared/calendar-resolver.service';

@NgModule({
    declarations: [
        CalendarComponent, 
        DayDetailComponent, 
        AddCaleventComponent, 
        CaleventListComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        CalendarRoutingModule,
        NgxFullCalendarModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatCheckboxModule,
        MatRadioModule,
        InstrumentModule,
        StoreModule.forFeature('calendar', eventsCalendarReduser),
        EffectsModule.forFeature([EventCalendarEffects]) 
    ],
    providers: [CalendarResolverService], 
    entryComponents: [
        DayDetailComponent,
        AddCaleventComponent
    ]
})
export class CalendarModule {
}
