import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private updates:  SwUpdate){}

  ngOnInit(){
    if(this.updates.isEnabled){
      this.updates.available.subscribe((event) => {
        this.updates.activateUpdate().then(() => document.location.reload());
        });      
    }
  }

}
