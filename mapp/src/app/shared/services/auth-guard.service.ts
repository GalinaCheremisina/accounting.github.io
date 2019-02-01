import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivateChild, Router } from "@angular/router";
import { Injectable } from "@angular/core";

import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(
        private _userService: UserService,
        private _router: Router){}
    
    canActivate(router:ActivatedRouteSnapshot,state:RouterStateSnapshot){
        if(!this._userService.getIsAuth()) {
            this._router.navigate(['/login']);
            return false;
        } else
        return this._userService.getIsAuth();
    }

    canActivateChild(router:ActivatedRouteSnapshot,state:RouterStateSnapshot){
        return this.canActivate(router,state);
    }
}