import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivateChild, Router } from "@angular/router";
import { Injectable } from "@angular/core";

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(
        private _authService:AuthService,
        private _router:Router){}
    
    canActivate(router:ActivatedRouteSnapshot,state:RouterStateSnapshot){
        if(!this._authService.isAuthenticated()) {
            this._router.navigate(['/login']);
            return false;
        } else
        return this._authService.isAuthenticated();
    }

    canActivateChild(router:ActivatedRouteSnapshot,state:RouterStateSnapshot){
        return this.canActivate(router,state);
    }
}