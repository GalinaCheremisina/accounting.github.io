import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';

import { Bill } from '../models/bill.model';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from '../../../../environments/environment';

const BACKEND_URL = environment.apiUrl + "/bill";

@Injectable()
export class BillService{

    actionBill$ = new Subject<Bill>();

    constructor(
        private _http: HttpClient,
        private _userService: UserService){}

    createBill(newBill: Bill): Observable<Bill> {
        const creatorUser = this._userService.getUserInfo();
        const bill: Bill = {
            value: newBill.value,
            currency: newBill.currency,
            creator: creatorUser.id
        }
        return this._http.post<{message: string, bill: Bill}>(BACKEND_URL, bill)
            .map(response => response.bill);
    }

    /**Get the bill */
    getBill(): Observable<Bill> {
        const creator = this._userService.getUserInfo();
        const queryParams = `?creator=${creator.id}`;
        return this._http.get<{message: string, bill: Bill}>(BACKEND_URL + queryParams)
            .map(result => {
                return result.bill
            });
    }

    /**Update the bill */
    updateBill(bill: Bill): void {
        this._http.put<{message: string}>(BACKEND_URL, bill)
                .subscribe();
    }

    /**Get currency */
    getCurrency(): Observable<any> {
        return this._http.get(
            `https://openexchangerates.org/api/latest.json?app_id=58dc12228fa448bc9dcf34f00b6c6bc4`
            );
    }
}