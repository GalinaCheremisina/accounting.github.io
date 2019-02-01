import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { EventService } from '../../shared/services/event.service';
import { EventRecord } from '../../shared/models/event.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  event: EventRecord;
  subscription: Subscription;

  constructor(
    private _route:ActivatedRoute,
    private _eventService:EventService) {}

  ngOnInit() {
    this.subscription = this._route.params
      .take(1)
      .mergeMap((param:Params)=> this._eventService.getEvent(param.id))
      .subscribe((event:EventRecord) => this.event = event );
  }

  /**Get class for the card's block */
  getClass(type:string): any {
    return {
      'card': true,
      'card-success': type === 'income',
      'card-danger': type === 'outcome'
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
