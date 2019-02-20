import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

import { Bill } from '../../budget/shared/models/bill.model';

@Injectable()
export class BillService{

    constructor(private _http:HttpClient){}

    /**Get the bill */
    getBill(): Observable<Bill> {
        return this._http.get<Bill>('https://accounting-homes.firebaseio.com/bill.json');
    } 

    /**Update the bill */
    updateBill(bill:Bill): void {
        let updates = {
            'bill':bill
        };
        firebase.database().ref().update(updates)
          .catch(error => console.log(error));
    }

    /**Get currency */
    getCurrency(): Observable<any> {
        return this._http.get(`https://openexchangerates.org/api/latest.json?app_id=58dc12228fa448bc9dcf34f00b6c6bc4`);
    }
}