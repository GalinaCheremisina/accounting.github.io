import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { Category } from '../../shared/models/category.model';
import { Message } from 'src/app/shared/models/message.model';
import { fadeStateTrigger } from 'src/app/shared/animations/fade.animation';
import * as fromBudget from '../../store/budget.reducers';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
  animations: [fadeStateTrigger]
})
export class EditCategoryComponent implements OnInit {

  @Input() data$: Observable<fromBudget.BudgetState>;
  @Output() onCategoryEdit = new EventEmitter<Category>();
  @Output() onCategoryDelete = new EventEmitter<string>();

  categories: Category[];
  currentCategory: Category;
  currentCategoryID = 0;
  message: Message;

  constructor() { }

  ngOnInit() {
    this.message = new Message('success', '');
    this.data$.subscribe((value: fromBudget.BudgetState) =>{
      this.categories = value.categories.categories;
      this.currentCategory = this.categories[0];
      this.currentCategoryID = 0;
    });
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
    this.message.text = 'Category was edited';
    window.setTimeout(() => this.message.text = '', 5000);
  }

  /**Category is changed */
  onCategoryChange(): void {
      this.currentCategory = this.categories[this.currentCategoryID];
  }

  onDeleteCategory(): void {
    this.onCategoryDelete.emit(this.categories[this.currentCategoryID].id);
  }
}
