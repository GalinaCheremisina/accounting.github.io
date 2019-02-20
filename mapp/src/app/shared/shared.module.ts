import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { LoaderComponent } from './components/loader/loader.component';
import { DropDownDirective } from './directives/dropdown.directive';

@NgModule({
    declarations: [
        DropDownDirective,
        LoaderComponent
    ],
    exports:[
        ReactiveFormsModule, 
        FormsModule, 
        NgxChartsModule,
        DropDownDirective,
        NgxDatatableModule,
        LoaderComponent
    ]
})
export class SharedModule{}