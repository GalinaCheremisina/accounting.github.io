import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { User } from 'src/app/shared/models/user.model';
import * as fromAuth from '../../../../auth/store/auth.reducers';
import * as AuthActions from '../../../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  date = new Date();
  user: User;

  private subscription: Subscription;

  constructor(
    private _store: Store<fromAuth.AuthState>,
    private _router:Router) { }

  ngOnInit() {
    /*this.subscription = this._store.select('auth')
                            .pipe(
                              map((data: fromAuth.State) => data.user),
                              map((user: User) => {
                                console.log(user);
                                return user;
                              }),
                              distinctUntilChanged()
                            )
                            .subscribe((user: User) => {
                              user ? this.user = user : this.user = {
                                                                        name: 'Guest',
                                                                        email: '',
                                                                        id: null
                                                                      };
                            });*/
    this.user = {
                name: 'Guest',
                email: '',
                id: null
    };
  }

  /**Sing out */
  onLogout(){
    //this._store.dispatch(new AuthActions.Logout());
    this._router.navigate(['/']);
  }

  ngOnDestroy(){
    //this.subscription.unsubscribe();
  }
}
