import { Directive, ElementRef, Input, Renderer2 } from "@angular/core";

@Directive({
    selector: '[title]'
})
export class TitleDirective{
    
    newHtml: HTMLElement = this._render.createElement('h3');
    spanEl: HTMLSpanElement = this._render.createElement('span');

    @Input() set title(value: string){        
        this.newHtml.classList.add('title');
        this.spanEl.classList.add('sparkline', 'bar');

        this.newHtml.textContent = value;
        this.newHtml.appendChild(this.spanEl);

        this._el.nativeElement.classList.add('title-block');
        this._el.nativeElement.appendChild(this.newHtml);
    }

    constructor(
        private _el: ElementRef,
        private _render: Renderer2){}
}