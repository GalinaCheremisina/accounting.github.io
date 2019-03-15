import { Directive, HostBinding, OnInit, ElementRef, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[title]'
})
export class TitleDirective implements OnInit{
    //@HostBinding() 
    tit = 'rrr';
   /* @HostListener('click') toggleOpen(){
        this.isOpened = !this.isOpened;
    } */

    constructor(private el: ViewContainerRef){}

    ngOnInit(){
        console.log(this.tit);
        console.log(this.el);
    }

}