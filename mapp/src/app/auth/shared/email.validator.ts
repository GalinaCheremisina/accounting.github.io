import { AbstractControl } from '@angular/forms';


export class EmailValidator{
    static checkEmail(control: AbstractControl){
        const regExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;
        const valid = regExp.test(control.value);
        return valid ? null : { invalidEmail: true };
    }
}