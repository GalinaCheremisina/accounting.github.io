import { Action } from "@ngrx/store";

import { Archive } from "../shared/models/archive.model";

export const GET_ARCHIVE = 'GET_ARCHIVE';
export const SET_ARCHIVE = 'SET_ARCHIVE';
export const ADD_ARCHIVE = 'ADD_ARCHIVE';

export class GetArchive implements Action{
    readonly type = GET_ARCHIVE;
}

export class SetArchive implements Action{
    readonly type = SET_ARCHIVE;

    constructor(public payload: Archive[]){}
}

export class AddArchive implements Action{
    readonly type = ADD_ARCHIVE;

    constructor(public payload: Archive){}
}

export type ArchiveActions = 
GetArchive | 
SetArchive |
AddArchive;