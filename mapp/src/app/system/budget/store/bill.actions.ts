import { Action } from "@ngrx/store";

import { Bill } from "../shared/models/bill.model";

export const GET_BILL = 'GET_BILL';
export const UPDATE_BILL = 'UPDATE_BILL';
export const SET_BILL = 'SET_BILL';
export const GET_CURRENCY = 'GET_CURRENCY';
export const SET_CURRENCY = 'SET_CURRENCY';

export class GetBill implements Action{
    readonly type = GET_BILL;
}

export class SetBill implements Action{
    readonly type = SET_BILL;

    constructor(public payload: Bill){}
}

export class UpdateBill implements Action{
    readonly type = UPDATE_BILL;

    constructor(public payload: Bill){}
}

export class GetCurrency implements Action{
    readonly type = GET_CURRENCY;
}

export class SetCurrency implements Action{
    readonly type = SET_CURRENCY;

    constructor(public payload: any){}
}

export type BillActions = 
GetBill | 
UpdateBill |
SetBill |
GetCurrency |
SetCurrency;