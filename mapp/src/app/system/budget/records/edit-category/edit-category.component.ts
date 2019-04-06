import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCategoryComponent implements OnInit {

  @Input() categories: Category[];
  @Output() onCategoryEdit = new EventEmitter<Category>();
  @Output() onCategoryDelete = new EventEmitter<string>();

  currentCategory: Category;
  currentCategoryID = 0;

  ngOnInit() {
      this.currentCategory = this.categories[0];
  }

  /**Submit form */
  onSubmit(formEdit: NgForm): void {
    const {value} = formEdit;
    if(value.capacity < 0) value.capacity*= -1;
    const category = {
      name: value.ename, 
      capacity: value.ecapacity,
      id: this.categories[this.currentCategoryID].id
    };
    this.onCategoryEdit.emit(category);
  }

  /**Category is changed */
  onCategoryChange(): void {
      this.currentCategory = this.categories[this.currentCategoryID];
  }

  onDeleteCategory(): void {
    const idCategory = this.categories[this.currentCategoryID].id;
    this.onCategoryDelete.emit(idCategory);
    if(this.categories.length > 0) {
      this.currentCategory = this.categories.filter((category: Category) => category.id !== idCategory)[0];
      this.currentCategoryID = 0;
    }
  }
}
