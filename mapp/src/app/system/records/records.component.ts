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
  subscription: Subscription;
  isLoaded = false;

  constructor(private _categoriesService:CategoriesService) { }

  ngOnInit() {
    this.subscription = this._categoriesService.getCategories()
      .subscribe((categories:Category[])=>{
        this.categories = categories;
        if(categories.length>0) {
          this.isLoaded = true;
        }
    });
  }

  /**Add a new category */
  newCategoryAdded(category:Category){
    this.categories.push(category);
    this.isLoaded = true;
  }

  /**Change the category */
  categoryWasEdited(category:Category){
    console.log(category);
    const idx = this.categories
                .findIndex(c => c.id === category.id);
    this.categories[idx] = category;
  }

  categoryDelete(categoryId: string){
    const idx = this.categories
                .findIndex(c => c.id === categoryId);
    this.categories.splice(idx,1);
    this._categoriesService.deleteCategory(categoryId);
    if(this.categories.length<=0){
      this.isLoaded = false;
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
