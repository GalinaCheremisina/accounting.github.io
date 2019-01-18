import { Component, Output, Input, EventEmitter } from '@angular/core';

import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent{

  @Output() onFilterCancel = new EventEmitter<any>();
  @Output() onFilterApply = new EventEmitter<any>();
  @Input() categories: Category[] = [];

  selectedPeriod = 'd';
  selectedTypes = [];
  selectedCategories = [];

  timePeriods = [
    {type: 'd', label: 'Day'},
    {type: 'w', label: 'Week'},
    {type: 'M', label: 'Month'}
  ];

  types = [
    {type: 'income', label: 'Income'},
    {type: 'outcome', label: 'Outcome'}
  ];

  /**Filter is closed */
  closeFilter(): void {
    this.selectedTypes = [];
    this.selectedCategories = [];
    this.selectedPeriod = 'd';
    this.onFilterCancel.emit();
  }

  /**Function create an array of params */
  private calculateInputParams(field: string, checked: boolean, value: string): void {
    if (checked) {
      this[field].indexOf(value) === -1 ? this[field].push(value) : null;
    } else {
      this[field] = this[field].filter(i => i!==value);
    }
  }

  /**Type is changed */
  handleChangeType({checked, value}): void {
    this.calculateInputParams('selectedTypes', checked, value);
  }

  /**Category is changed */
  handleChangeCategory({checked, value}): void {
    this.calculateInputParams('selectedCategories', checked, value);
  }

  /**Send filter's values */
  applyFilter(): void {
    this.onFilterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    });
  }
}
