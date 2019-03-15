import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';

import { SystemComponent } from './system.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { TopMenuComponent } from './shared/components/top-menu/top-menu.component';
import { GoalModule } from './goals/goals.module';

@NgModule({
    declarations:[
        SystemComponent,
        HeaderComponent,
        SidebarComponent,
        TopMenuComponent
    ],
    imports:[
        CommonModule,
        SharedModule,
        //CalendarModule, 
        GoalModule,
        SystemRoutingModule
    ],
    providers:[]
})
export class SystemModule{}