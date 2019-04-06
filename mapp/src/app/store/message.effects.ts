import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, delay } from 'rxjs/operators';

import * as MessageActions from './message.actions';

@Injectable()
export class MessageEffects{
    
    @Effect()
    addMessage = this.$actions
      .pipe(
        ofType(MessageActions.ERROR, MessageActions.SUCCESS),
        map((action: MessageActions.Error | MessageActions.Success)=>{
            return action.payload;
        }),
        delay(3500),
        mergeMap(() => {
            return [
                {
                  type: MessageActions.NONE
                }
              ];
        })
        ); 
        

    @Effect({dispatch: false})
    deleteMessage = this.$actions
    .pipe(
      ofType(MessageActions.NONE),
      map((x) => {
          console.log('None message');
          return x;
      })
    );

    constructor(private $actions: Actions) {}
}