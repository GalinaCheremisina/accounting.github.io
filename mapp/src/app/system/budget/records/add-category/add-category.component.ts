/**TODO */
import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCategoryComponent {

  @Output() onCategoryAdd = new EventEmitter<Category>();

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
  }
}
