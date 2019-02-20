import { EventRecord } from '../shared/models/event.model';
import * as EventsActions from './events.actions';
import * as fromApp from 'src/app/store/app.reducers';

export interface EventsState extends fromApp.AppState {
  events: State
};

export interface State {
  events: EventRecord[]
};

const initialState : State = {
  events: []
};

export function eventsReduser(state = initialState, action: EventsActions.EventsActions){

    switch(action.type){
        case (EventsActions.SET_EVENTS):
            return {
                ...state,
                events : [...action.payload]
            };

        case (EventsActions.SET_EVENT): 
            return {
                ...state,
                events : [...state.events, action.payload]
            };

        case (EventsActions.DELETE_EVENT):
          const oldEvents = [...state.events];
          const indexDeletedEvent = state.events.findIndex((value) => value.id === action.payload);
          oldEvents.splice(indexDeletedEvent,1)
          return {
            ...state,
            events: oldEvents
          };

        default:
          return state;
    }
}