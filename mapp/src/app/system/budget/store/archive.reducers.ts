import { Archive } from '../shared/models/archive.model';
import * as ArchiveActions from './archive.action';
import * as fromApp from 'src/app/store/app.reducers';

export interface ArchiveState extends fromApp.AppState {
  arhives: State
};

export interface State {
    arhives: Archive[]
};

const initialState : State = {
    arhives: []
};

export function archiveReduser(state = initialState, action: ArchiveActions.ArchiveActions){

    switch(action.type){
        case (ArchiveActions.SET_ARCHIVE):
            return {
                ...state,
                arhives : [...action.payload]
            };

        default:
          return state;
    }
}