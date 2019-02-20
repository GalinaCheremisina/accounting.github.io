import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivateChild, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import * as fromAuth from './store/auth.reducers';
import * as fromApp from '../store/app.reducers';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild{

    constructor(
        private _store:Store<fromApp.AppState>,
        private _router: Router){}
    
    canActivate(router:ActivatedRouteSnapshot,state:RouterStateSnapshot){
        /**const token = localStorage.getItem("token");
    // проверяем не истек ли срок действия токена
    return !this.jwtHelper.isTokenExpired(token); */
        return this._store.select('auth')
                    .take(1)
                    .map((authState:fromAuth.State)=>{
                        if (!authState.authenticated) {
                          this._router.navigate(['/']);
                        }
                        return authState.authenticated;
                    });
    }
    
    canActivateChild(router:ActivatedRouteSnapshot,state:RouterStateSnapshot){
        return this.canActivate(router,state);
    }

}