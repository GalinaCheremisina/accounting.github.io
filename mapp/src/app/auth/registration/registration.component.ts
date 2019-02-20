import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromAuth from '../store/auth.reducers';
import { TrySignup } from '../store/auth.actions';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor(private _store: Store<fromAuth.State>) { }

  ngOnInit() {
    this.form = new FormGroup({
      name : new FormControl(null,[Validators.required,Validators.minLength(3)]),
      email : new FormControl(null,[Validators.required,Validators.email]),
      password : new FormControl(null,[Validators.required,Validators.minLength(6)]),
      agree : new FormControl(null,[Validators.requiredTrue])
    });
  }

  /**Submit form */
  onSubmit(): void {
    const formData = this.form.value;
    this._store.dispatch(new TrySignup({
                        useremail: formData.email,
                        username: formData.name,
                        password: formData.password}));
  }
}
