import { Category } from '../shared/models/category.model';
import * as CategoryActions from './categories.actions';
import * as fromApp from 'src/app/store/app.reducers';

export interface CategoryState extends fromApp.AppState {
  categories: State
};

export interface State {
  categories: Category[]
};

const initialState : State = {
  categories: []
};

export function categoryReduser(state = initialState, action: CategoryActions.CategoryActions){

    switch(action.type){
        case (CategoryActions.SET_CATEGORIES):
            return {
                ...state,
                categories : [...action.payload]
            };

        case (CategoryActions.UPDATE_CATEGORY):
          const indexUpdatedCategory = state.categories.findIndex((value) => value.id === action.payload.id);
          let categoryOld = state.categories[indexUpdatedCategory];
          const updatedCategory = {
            ...categoryOld, 
            ...action.payload
          };
          const categories = [...state.categories];
          categories[indexUpdatedCategory] = updatedCategory;
          return {
            ...state,
            categories: categories
          };

        case (CategoryActions.SET_CATEGORY):
            return {
                ...state,
                categories : [...state.categories, action.payload]
            };

        case (CategoryActions.DELETE_CATEGORY):
          const oldCategories = [...state.categories];
          const indexDeletedEvent = state.categories.findIndex((value) => value.id === action.payload);
          oldCategories.splice(indexDeletedEvent,1)
          return {
            ...state,
            categories: oldCategories
          };

        default:
          return state;
    }
}