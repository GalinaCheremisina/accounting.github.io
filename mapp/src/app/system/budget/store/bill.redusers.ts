import { Bill } from "../shared/models/bill.model";
import * as BillActions from './bill.actions';
import * as fromApp from 'src/app/store/app.reducers';

export interface BillState extends fromApp.AppState {
    bill: State
};

export interface State {
    activeBill: Bill,
    currency: any
};

const initialState : State = {
    activeBill: {
        value: 0,
        currency: 'USD',
        id: null
    },
    currency: null
};

export function billReduser(state = initialState, action:BillActions.BillActions){

    switch(action.type){
        case (BillActions.SET_BILL):
            return {
                ...state,
                activeBill : action.payload
            };
        case (BillActions.SET_CURRENCY):
            return {
                ...state,
                currency : action.payload
            };
          default:
            return state;
    }
}