import { ActionReducerMap } from '@ngrx/store';

import * as fromBill from './bill.redusers';
import * as fromCategory from './categories.redusers';
import * as fromEvents from './events.redusers';
import * as fromArchive from './archive.reducers';

export interface BudgetState {
    bill: fromBill.State,
    categories: fromCategory.State,
    events: fromEvents.State,
    archive: fromArchive.State
};

export const reducers: ActionReducerMap<BudgetState> = {
    bill: fromBill.billReduser,
    categories: fromCategory.categoryReduser,
    events: fromEvents.eventsReduser,
    archive: fromArchive.archiveReduser
};