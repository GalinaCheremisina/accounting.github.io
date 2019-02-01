import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Category } from '../models/category.model';
import { UserService } from 'src/app/shared/services/user.service';
import { EventService } from './event.service';
import { environment } from '../../../../environments/environment';

const BACKEND_URL = environment.apiUrl + "/category/";

@Injectable()
export class CategoriesService{

    creatorUser = this._userService.getUserInfo();

    constructor(
        private _http: HttpClient,
        private _userService: UserService,
        private _eventsService: EventService){}

    /**Get categories */
    getCategories(): Observable<Category[]> {
        return this._http.get<{message: string, categories: any}>(BACKEND_URL)
            .map(response => {
                return response.categories.map(category => {
                    return {
                      name: category.name,
                      capacity: category.capacity,
                      id: category._id,
                      creator: category.creator
                    };
                })
            });
    }

    /**Edit a category */
    editCategory(category:Category): void {
        this._http
        .put<{message:string}>(BACKEND_URL + category.id, category);
    }

    /**Add a category */
    addCategory(category:Category): Observable<Category> {
        return this._http.post<{message: string, category: Category}>(BACKEND_URL,category)
            .map(response => response.category);
    }

    /**Delete the category */
    deleteCategory(categoryId: string): void{
        this._http.delete(BACKEND_URL + categoryId)
            .subscribe(() => this._eventsService.deleteEvents(categoryId));
      }
}