import { ActionReducerMap } from '@ngrx/store';

import * as fromEvents from './eventscalendar.redusers';

export interface CalendarState {
    events: fromEvents.State
};

export const reducers: ActionReducerMap<CalendarState> = {
    events: fromEvents.eventsCalendarReduser
};