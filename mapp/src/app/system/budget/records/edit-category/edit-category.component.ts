/**TODO */
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { Category } from '../../shared/models/category.model';
import { Message } from 'src/app/shared/models/message.model';
import { fadeStateTrigger } from 'src/app/shared/animations/fade.animation';
import * as fromBudget from '../../store/budget.reducers';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeStateTrigger]
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  @Input() data$: Observable<fromBudget.BudgetState>;
  @Output() onCategoryEdit = new EventEmitter<Category>();
  @Output() onCategoryDelete = new EventEmitter<string>();

  categories: Category[];
  currentCategory: Category;
  currentCategoryID = 0;
  message: Message;

  private subscription: Subscription;

  constructor(private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.message = new Message('success', '');
    this.subscription = this.data$.subscribe((value: fromBudget.BudgetState) =>{
      this.categories = value.categories.categories;
      this.currentCategory = this.categories[0];
      this.currentCategoryID = 0;
      this._cdr.markForCheck();
      console.log('subs EditCategoryComponent');
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
    this.message.text = 'Category was edited';//переделать
    window.setTimeout(() => this.message.text = '', 5000);
  }

  /**Category is changed */
  onCategoryChange(): void {
      this.currentCategory = this.categories[this.currentCategoryID];
  }

  onDeleteCategory(): void {
    this.onCategoryDelete.emit(this.categories[this.currentCategoryID].id);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
