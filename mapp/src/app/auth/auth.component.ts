import { Component, HostBinding } from "@angular/core";

@Component({
    selector: "app-auth",
    templateUrl: './auth.component.html'
})
export class AuthComponent{
    isLogin: boolean = true;
}