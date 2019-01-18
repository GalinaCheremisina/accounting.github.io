import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category.model';
import { Message } from 'src/app/shared/models/message.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  @Input() lastID:number;
  @Output() onCategoryAdd = new EventEmitter<Category>();

  message: Message;

  constructor(private _categoriesService:CategoriesService) { }

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
      id:this.lastID
    };
    this._categoriesService.addCategory(category);
    formAdd.resetForm();
    formAdd.controls['capacity'].setValue(1);
    this.onCategoryAdd.emit(category);
    this.message.text = 'Категория успешно added.';
    window.setTimeout(() => this.message.text = '', 5000);
  }
}
