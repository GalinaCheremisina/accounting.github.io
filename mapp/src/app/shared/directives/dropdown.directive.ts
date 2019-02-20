import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropDownDirective{
    @HostBinding('class.open') isOpened = false;
    @HostListener('click') toggleOpen(){
        this.isOpened = !this.isOpened;
    } 
}