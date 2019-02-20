import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Title, Meta } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { fadeStateTrigger } from 'src/app/shared/animations/fade.animation';
import * as fromAuth from '../store/auth.reducers';
import { TrySignin } from '../store/auth.actions';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  formValid = true;
  singUpOk = true;
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;

  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _store: Store<fromAuth.State>,
    private title: Title,
    private metategs: Meta) {
      title.setTitle('Login page | Home Accounting');
      metategs.addTags([
        {name:'description', content: 'Login page | Home Accounting'},
        {name:'keywords', content: 'Login page'},
      ])
    }

  ngOnInit() {
    this.form = new FormGroup({
      'email' : new FormControl(null,[Validators.required,Validators.email]),
      'password' : new FormControl(null,[Validators.required,Validators.minLength(6)])
    });

    this.sub1 = this.form.valueChanges
      .subscribe(()=>{
        if(!this.formValid) this.formValid = !this.formValid;
        if(this.singUpOk) this.singUpOk = !this.singUpOk;
      });
    
    this.sub2 = this._route.queryParams
      .subscribe((param:Params)=> this.singUpOk = param['singUpOk']);
  }

  /**Submit form Sing In */
  onSubmit(): void {
    const formData = this.form.value;
    this._store.dispatch(new TrySignin({
                        useremail: formData.email,
                        password: formData.password}));

                        
    this.sub3 = this._userService.isAuthenticated$.subscribe((result)=> this.formValid = result );
  }

  ngOnDestroy(){
    if(this.sub1) this.sub1.unsubscribe();
    if(this.sub2) this.sub2.unsubscribe();
    if(this.sub3) this.sub3.unsubscribe();
  }
}
