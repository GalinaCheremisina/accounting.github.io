import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import * as firebase from 'firebase/app';
import { Store } from '@ngrx/store';
import { map, skip } from 'rxjs/operators';

import * as fromApp from './store/app.reducers'; 
import * as fromMessage from './store/message.reducers';
import { Message } from './shared/models/message.model';
import { MessageComponent } from './shared/components/message/message.component';

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

  @ViewChild('blockForMessage', {read: ViewContainerRef}) blockForMessage: ViewContainerRef;
  message: ComponentRef<MessageComponent>;

  constructor(
    private _store: Store<fromApp.AppState>,
    private _resolver: ComponentFactoryResolver){}

  ngOnInit(){
    firebase.initializeApp(this.config);

    this._store.select('message')
      .pipe(
        skip(1),
        map((message: fromMessage.State) => message.message)
      )
      .subscribe((mes: Message) => {

        if(mes) {
          if(this.message) {
            this.message.instance.isExist = false;
            this.message.destroy();
          }

          this.factory();
          this.message.instance.title = mes.text;
          this.message.instance.isExist = true;
          this.message.instance.type = mes.type.toLocaleLowerCase();
        } else {
          this.message.instance.isExist = false;
          this.message.destroy();
        }
      });
    
  }
  
  private factory(): void {
    const messageFactory = this._resolver.resolveComponentFactory(MessageComponent);
    this.message = this.blockForMessage.createComponent(messageFactory);    
  }
}
