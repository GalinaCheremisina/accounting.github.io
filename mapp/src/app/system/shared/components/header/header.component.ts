import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/auth/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  date = new Date();
  user: User;

  constructor(
    private _userService:UserService,
    private _authService:AuthService,
    private _router:Router) { }

  ngOnInit() {
   this._userService.activeUser$
    .take(1)
    .subscribe((value)=> this.user = value);
  }

  /**Sing out */
  onLogout(){
    //this._authService.logout();
    this._router.navigate(['/auth']);
  }
}
