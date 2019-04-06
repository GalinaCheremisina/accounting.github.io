import { EventObject } from 'ngx-fullcalendar';
import * as fromApp from 'src/app/store/app.reducers';

import * as MassegeActions from './message.actions';
import { Message } from '../shared/models/message.model';

export interface State {
    message: Message
};

const initialState : State = {
    message: null
};

export function MessageReducers(state = initialState, action: MassegeActions.MassegeActions){

    switch(action.type){
        case (MassegeActions.ERROR):
        case (MassegeActions.SUCCESS):
            return {
                ...state,
                message : action.payload
            };
        case (MassegeActions.NONE):
            return {
                ...state,
                message: null
            };

        default:
          return state;
    }
}