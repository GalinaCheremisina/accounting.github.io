import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor(private _authService:AuthService) { }

  ngOnInit() {
    this.form = new FormGroup({
      email : new FormControl(null,[Validators.required,Validators.email]),
      password : new FormControl(null,[Validators.required,Validators.minLength(6)]),
      name : new FormControl(null,[Validators.required]),
      agree : new FormControl(null,[Validators.requiredTrue])
    });
  }

  /**Submit form */
  onSubmit(): void {
    const formData = this.form.value;
    this._authService.signupUser(formData.name, formData.email, formData.password);
  }
}
