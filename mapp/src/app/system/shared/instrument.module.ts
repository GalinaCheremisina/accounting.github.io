import { NgModule } from "@angular/core";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { TitleDirective } from './directives/title.directive';


@NgModule({
    declarations: [
        TitleDirective
    ],
    exports:[
        NgxChartsModule,
        NgxDatatableModule,
        TitleDirective
    ]
})
export class InstrumentModule{}