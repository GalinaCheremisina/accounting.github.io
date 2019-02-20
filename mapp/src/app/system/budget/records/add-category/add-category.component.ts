import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Category } from '../../shared/models/category.model';
import { Message } from 'src/app/shared/models/message.model';
import { fadeStateTrigger } from 'src/app/shared/animations/fade.animation';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  animations: [fadeStateTrigger]
})
export class AddCategoryComponent implements OnInit {

  @Output() onCategoryAdd = new EventEmitter<Category>();

  message: Message;

  constructor() { }

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
      id: null
    };
    formAdd.resetForm();
    formAdd.controls['capacity'].setValue(1);
    this.onCategoryAdd.emit(category);
    this.message.text = 'Category is added.';
    window.setTimeout(() => this.message.text = '', 5000);
  }
}
