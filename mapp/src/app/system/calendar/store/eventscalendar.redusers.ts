import { EventObject } from 'ngx-fullcalendar';
import * as fromApp from 'src/app/store/app.reducers';

import * as EventsCalendarActions from './eventscalendar.actions';

export interface EventsCalendarState extends fromApp.AppState {
  events: State 
};

export interface State {
  events: EventObject[]
};

const initialState : State = {
  events: []
};

export function eventsCalendarReduser(state = initialState, action: EventsCalendarActions.EventsCalendarActions){

    switch(action.type){
        case (EventsCalendarActions.SET_CAL_EVENTS):
            return {
                ...state,
                events : [...action.payload]
            };

        case (EventsCalendarActions.ADD_CAL_EVENT):
            return {
                ...state,
                events : [...state.events, action.payload]
            };

        case (EventsCalendarActions.SET_CAL_EVENT):
          const indexSettedEvent = state.events.findIndex((value) => 
                                        value.start === action.payload.start 
                                        && value.end === action.payload.end
                                        && !value.id);
          let eventss = state.events[indexSettedEvent];
          const settedEvent = {
            ...eventss, 
            id: action.payload.id
          };
          const eventsAdd = [...state.events];
          eventsAdd[indexSettedEvent] = settedEvent;
          return {
            ...state,
            events: eventsAdd
          };

        case (EventsCalendarActions.DELETE_CAL_EVENT):
          const oldEvents = [...state.events];
          const indexDeletedEvent = state.events.findIndex((value) => value.id === action.payload);
          oldEvents.splice(indexDeletedEvent,1)
          return {
            ...state,
            events: oldEvents
          };

        case (EventsCalendarActions.UPDATE_CAL_EVENT):
          const indexUpdatedEvent = state.events.findIndex((value) => value.id === action.payload.id);
          let eventOld = state.events[indexUpdatedEvent];
          const updatedEvent = {
            ...eventOld, 
            ...action.payload
          };
          const eventsNew = [...state.events];
          eventsNew[indexUpdatedEvent] = updatedEvent;
          return {
            ...state,
            events: eventsNew
          };

        default:
          return state;
    }
}