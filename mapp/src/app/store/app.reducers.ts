import { ActionReducerMap } from '@ngrx/store';

import * as fromMessage from './message.reducers';

export interface AppState{ 
    message: fromMessage.State
}

export const reducers: ActionReducerMap<AppState> = {
    message: fromMessage.MessageReducers
}