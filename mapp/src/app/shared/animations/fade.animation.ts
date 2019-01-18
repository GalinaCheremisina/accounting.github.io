import { trigger, transition, style, animate } from '@angular/animations';

export const fadeStateTrigger = trigger('fade',[
    transition(':enter', [
        style({
            opacity: 0
        }),
        animate(500)
    ]),
    transition(':leave', animate(500, style({
        opacity: 0
    })))
]);