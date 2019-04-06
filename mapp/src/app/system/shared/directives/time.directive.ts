import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[timeIn]'
})
export class TimeDirective{

    oldValue: string;

    @HostBinding('style.border') 
    styleBorder: string; 

    @HostListener('focus',['$event'])
    onFocusInput(event: FocusEvent){
        const input = event.target as HTMLInputElement;
        this.oldValue = input.value;
    }

    @HostListener('input', ['$event']) 
    onKeyDown(event: KeyboardEvent){
        const input = event.target as HTMLInputElement;

        let trimmed = input.value.replace(/[^0-9]/g, '');
        if (trimmed.length > 4){
            trimmed = trimmed.substr(0,4);
        }

        let nums = [];
        for(let i=0; i<trimmed.length; i+=2){
            nums.push(trimmed.substr(i,2));
        }
        
        input.value = nums.join(':');

        if(/^(([0,1][0-9])|(2[0-3])):[0-5][0-9]$/.test(input.value)){
            this.styleBorder = '';
        } else {
            this.styleBorder = '1px solid #f44336';
        }
    } 

    @HostListener('change', ['$event']) 
    onChange(event: Event){
        const input = event.target as HTMLInputElement;
        
        if(this.styleBorder){
            input.value = this.oldValue;
            this.styleBorder ='';
        }
    } 
}