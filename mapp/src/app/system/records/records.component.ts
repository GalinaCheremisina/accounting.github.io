import { Component, OnInit, OnDestroy } from '@angular/core';

import { Category } from '../shared/models/category.model';
import { CategoriesService } from '../shared/services/categories.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  isLoaded = false;
  lastID: number;
  subscription: Subscription;

  constructor(private _categoriesService:CategoriesService) { }

  ngOnInit() {
    this.subscription = this._categoriesService.getCategories()
      .subscribe((categories:Category[])=>{
        this.categories = categories;
        this.lastID = categories[categories.length-1].id;
        this.isLoaded = true;
    })
  }

  /**Add a new category */
  newCategoryAdded(category:Category){
    this.categories.push(category);
  }

  /**Change the category */
  categoryWasEdited(category:Category){
    const idx = this.categories
                .findIndex(c => c.id === +category.id);
    this.categories[idx]=category;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
