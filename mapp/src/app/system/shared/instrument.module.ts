import { NgModule } from "@angular/core";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { TitleDirective } from './directives/title.directive';
import { TimeDirective } from './directives/time.directive';


@NgModule({
    declarations: [
        TitleDirective,
        TimeDirective
    ],
    exports:[
        NgxChartsModule,
        NgxDatatableModule,
        TitleDirective,
        TimeDirective
    ]
})
export class InstrumentModule{}