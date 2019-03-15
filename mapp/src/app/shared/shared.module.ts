import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
        DropDownDirective,
        LoaderComponent
    ]
})
export class SharedModule{}