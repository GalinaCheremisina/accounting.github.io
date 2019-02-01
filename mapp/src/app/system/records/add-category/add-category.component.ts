import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category.model';
import { Message } from 'src/app/shared/models/message.model';
import { fadeStateTrigger } from 'src/app/shared/animations/fade.animation';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  animations: [fadeStateTrigger]
})
export class AddCategoryComponent implements OnInit {

  @Output() onCategoryAdd = new EventEmitter<Category>();

  message: Message;

  constructor(
    private _categoriesService:CategoriesService,
    private _userService: UserService) { }

  ngOnInit(){
    this.message = new Message('success', '');
  }

  /**Submit form */
  onSubmit(formAdd:NgForm): void {
    const {value} = formAdd;
    if(value.capacity<0) value.capacity*= -1;
    const category = {
      name: value.name, 
      capacity: value.capacity,
      id: null,
      creator: this._userService.getUserInfo().id
    };
    this._categoriesService.addCategory(category)
      .subscribe(newCategory => {
        this.onCategoryAdd.emit(newCategory);
      });
    formAdd.resetForm();
    formAdd.controls['capacity'].setValue(1);
    this.message.text = 'Category is added.';
    window.setTimeout(() => this.message.text = '', 5000);
  }
}
