import { Action } from "@ngrx/store";

import { Category } from '../shared/models/category.model';


export const GET_CATEGORIES = 'GET_CATEGORIES';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_CATEGORY = 'SET_CATEGORY';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';


export class GetCategories implements Action{
    readonly type = GET_CATEGORIES;
}

export class SetCategories implements Action{
    readonly type = SET_CATEGORIES;

    constructor(public payload: Category[]){}
}

export class AddCategory implements Action{
    readonly type = ADD_CATEGORY;

    constructor(public payload: Category){}
}

export class SetCategory implements Action{
    readonly type = SET_CATEGORY;

    constructor(public payload: Category){}
}

export class UpdateCategory implements Action{
    readonly type = UPDATE_CATEGORY;

    constructor(public payload: Category){}
}

export class DeleteCategory implements Action{
    readonly type = DELETE_CATEGORY;

    constructor(public payload: string){}
}

export type CategoryActions = GetCategories |
                            SetCategories |
                            AddCategory |
                            SetCategory |
                            UpdateCategory |
                            DeleteCategory;
