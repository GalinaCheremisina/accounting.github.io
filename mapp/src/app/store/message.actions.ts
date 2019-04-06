import { Action } from '@ngrx/store';

import { Message } from '../shared/models/message.model';

export const ERROR = 'ERROR';
export const SUCCESS = 'SUCCESS';
export const NONE = 'NONE';

export class Error implements Action {
  readonly type = ERROR;

  constructor(public payload: Message) {}
}

export class Success implements Action {
    readonly type = SUCCESS;
  
    constructor(public payload: Message) {}
}

export class None implements Action {
  readonly type = NONE;
}

export type MassegeActions = Error | Success | None;