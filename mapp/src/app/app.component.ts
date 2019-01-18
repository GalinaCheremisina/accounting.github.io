import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private config = {
    apiKey: 'AIzaSyB0u_sNc3BgNuLUQQH7llw1xFAwbCXd2ZA',
    authDomain: 'accounting-homes.firebaseapp.com',
    databaseURL: 'https://accounting-homes.firebaseio.com',
    projectId: 'accounting-homes',
    storageBucket: 'accounting-homes.appspot.com',
    messagingSenderId: ''
  };
  ngOnInit(){
    firebase.initializeApp(this.config);
  }
}
