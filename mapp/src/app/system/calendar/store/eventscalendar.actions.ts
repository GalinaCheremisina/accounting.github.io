import { Action } from "@ngrx/store";
import { EventObject } from 'ngx-fullcalendar';


export const GET_CAL_EVENTS = 'GET_CAL_EVENTS';
export const SET_CAL_EVENTS = 'SET_CAL_EVENTS';
export const SET_CAL_EVENT = 'SET_CAL_EVENT';
export const ADD_CAL_EVENT = 'ADD_CAL_EVENT';
export const UPDATE_CAL_EVENT = 'UPDATE_CAL_EVENT';
export const DELETE_CAL_EVENT = 'DELETE_CAL_EVENT';


export class GetCalEvents implements Action{
    readonly type = GET_CAL_EVENTS;
}

export class SetCalEvents implements Action{
    readonly type = SET_CAL_EVENTS;

    constructor(public payload: EventObject[]){}
}

export class AddCalEvent implements Action{
    readonly type = ADD_CAL_EVENT;

    constructor(public payload: EventObject){}
}

export class SetCalEvent implements Action{
    readonly type = SET_CAL_EVENT;

    constructor(public payload: EventObject){}
}

export class UpdateCalEvent implements Action{
    readonly type = UPDATE_CAL_EVENT;

    constructor(public payload: EventObject){}
}

export class DeleteCalEvent implements Action{
    readonly type = DELETE_CAL_EVENT;

    constructor(public payload: string){}
}


export type EventsCalendarActions = GetCalEvents |
                            SetCalEvents |
                            SetCalEvent |
                            AddCalEvent |
                            DeleteCalEvent |
                            UpdateCalEvent;
