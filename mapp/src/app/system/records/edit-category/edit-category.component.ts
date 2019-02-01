import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Category } from '../../shared/models/category.model';
import { CategoriesService } from '../../shared/services/categories.service';
import { Message } from 'src/app/shared/models/message.model';
import { fadeStateTrigger } from 'src/app/shared/animations/fade.animation';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
  animations: [fadeStateTrigger]
})
export class EditCategoryComponent implements OnInit {

  @Input() categories: Category[];
  @Output() onCategoryEdit = new EventEmitter<Category>();
  @Output() onCategoryDelete = new EventEmitter<string>();

  currentCategory: Category;
  currentCategoryID = '';
  message: Message;

  constructor(
      private _categoriesService:CategoriesService,
      private _userService: UserService) { }

  ngOnInit() {
    this.message = new Message('success', '');
    if(this.categories){
      this.currentCategory = this.categories[0];
      this.currentCategoryID = this.currentCategory.id;      
    }
  }

  /**Submit form */
  onSubmit(formEdit: NgForm): void {
    const {value} = formEdit;
    if(value.capacity<0) value.capacity*= -1;
    const category = {
      name: value.ename, 
      capacity: value.ecapacity,
      id: this.currentCategoryID,
      creator: this._userService.getUserInfo().id
    };
    this._categoriesService.editCategory(category);
    this.onCategoryEdit.emit(category);
    this.message.text = 'Category was edited';
    window.setTimeout(() => this.message.text = '', 5000);
  }

  /**Category is changed */
  onCategoryChange(): void {
    this.currentCategory = this.categories
        .find( c => c.id === this.currentCategoryID);
  }

  /**Category is deleted */
  deleteCategory(): void {
    this.onCategoryDelete.next(this.currentCategoryID);
    if( this.categories.length > 1 ){
    this.currentCategory = this.categories[0];
    this.currentCategoryID = this.currentCategory.id;      
    }
  }
}
