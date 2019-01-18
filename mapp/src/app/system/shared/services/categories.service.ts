import { Injectable } from "@angular/core";
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';

import { Category } from '../models/category.model';

@Injectable()
export class CategoriesService{

    /**Get categories */
    getCategories(): Observable<Category[]> {
        return Observable.of([])
        .switchMap(()=> 
        fromPromise(firebase.database().ref('categories').orderByChild('id').once('value')))
        .map((snapshot)=> snapshot.val());
    }

    /**Edit a category */
    editCategory(category:Category): void {
        const categoryKey = category.id;
        var updates = {};
        updates['/categories/' + categoryKey] = category;  
        firebase.database().ref().update(updates)
          .catch(error => console.log(error))
    }

    /**Add a category */
    addCategory(category:Category): void {        
        const userKey = category.id+1;
        var updates = {};

        category = {...category,...{id:userKey}};
        updates['/categories/' + userKey] = category;  
        firebase.database().ref().update(updates)
          .catch(error => console.log(error))
    }
}