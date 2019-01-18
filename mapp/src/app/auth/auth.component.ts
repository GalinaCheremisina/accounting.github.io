import { Component, OnInit, HostBinding } from "@angular/core";
import { Router } from '@angular/router';

import { fadeStateTrigger } from '../shared/animations/fade.animation';

@Component({
    selector: "app-auth",
    templateUrl: './auth.component.html',
    animations: [fadeStateTrigger]
})
export class AuthComponent implements OnInit{

    @HostBinding('@fade') anim = true;

    constructor(private _router:Router){}

    ngOnInit(){
        this._router.navigate(['/login']);
    }
}