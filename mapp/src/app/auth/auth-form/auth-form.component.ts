import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromAuth from '../store/auth.reducers';
import { TrySignup, TrySignin } from '../store/auth.actions';
import { EmailValidator } from '../shared/email.validator';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {

  @Input()
  isLogin: boolean;

  title: string;
  form: FormGroup

  constructor(
    private _store: Store<fromAuth.State>,
    private _authService: AuthService) { }

  ngOnInit() {
    this.title = this.isLogin ? 'Sing in' : 'Sing up';

    this.form = new FormGroup({
      name: new FormControl(null, this.isLogin ? [] : [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required, EmailValidator.checkEmail], [this.validateUser.bind(this)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      agree: new FormControl(null, [Validators.requiredTrue])
    });
  }

  validateUser(control: AbstractControl){
    return this._authService.checkUser(control.value)
              .map((response: boolean) => {
                if(this.isLogin) return response ? null : {unknownUser: true};
                  else  return response ? {unknownUser: true} : null;
              });
  }

  get unknown(){
    return (this.form.get('email').hasError('unknownUser') &&
    this.form.get('email').dirty
    );
  }

  errorClass(name: string): boolean {
    return (
      this.form.get(name).invalid && this.form.get(name).touched
    );
  }

  required(control: string): boolean{
    return (this.form.get(control).hasError('required') 
            && this.form.get(control).touched);
  }

  invalidLength(control: string): boolean{
    return (this.form.get(control).hasError('minlength') &&
            this.form.get(control).dirty &&
            !this.required(control));
  }

  get invalidEmail() {
    return (this.form.get('email').hasError('invalidEmail') &&
            this.form.get('email').dirty &&
            !this.required('email'));
  }

  onSubmit(){
    console.log(this.form.value);
    const formData = this.form.value;
    if(this.isLogin){
      this._store.dispatch(new TrySignin({
                          useremail: formData.email,
                          password: formData.password}));
    } else {                    
      this._store.dispatch(new TrySignup({
                          useremail: formData.email,
                          username: formData.name,
                          password: formData.password}));
      }
  }

}
