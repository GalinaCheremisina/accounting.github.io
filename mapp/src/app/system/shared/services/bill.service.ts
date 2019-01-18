import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

import { Bill } from '../models/bill.model';

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
        return this._http.get(`http://data.fixer.io/api/latest?access_key=37209d49d9ab4949a703d43ecb69533b`);
    }
}