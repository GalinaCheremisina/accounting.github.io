import { Action } from "@ngrx/store";

import { EventRecord } from '../shared/models/event.model';


export const GET_EVENTS = 'GET_EVENTS';
export const SET_EVENTS = 'SET_EVENTS';
export const SET_EVENT = 'SET_EVENT';
export const ADD_EVENT = 'ADD_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';
export const DELETE_EVENTS = 'DELETE_EVENTS';
export const DELETE_EVENTS_IN_STATE = 'DELETE_EVENTS_IN_STATE';
export const FAIL = 'FAIL';


export class GetEvents implements Action{
    readonly type = GET_EVENTS;
}

export class SetEvents implements Action{
    readonly type = SET_EVENTS;

    constructor(public payload: EventRecord[]){}
}

export class AddEvent implements Action{
    readonly type = ADD_EVENT;

    constructor(public payload: EventRecord){}
}

export class SetEvent implements Action{
    readonly type = SET_EVENT;

    constructor(public payload: EventRecord){}
}

export class DeleteEvent implements Action{
    readonly type = DELETE_EVENT;

    constructor(public payload: string){}
}

export class DeleteEvents implements Action{
    readonly type = DELETE_EVENTS;

    constructor(public payload: string){}
}

export class DeleteEventsInState implements Action{
    readonly type = DELETE_EVENTS_IN_STATE;

    constructor(public payload: string){}
}

export class Fail implements Action{
    readonly type = FAIL;

    constructor(public payload: string){}
}

export type EventsActions = GetEvents |
                            SetEvents |
                            SetEvent |
                            AddEvent |
                            DeleteEvent |
                            DeleteEvents |
                            DeleteEventsInState |
                            Fail;
