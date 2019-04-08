import * as AuthActions from "./auth.actions";
import { User } from 'src/app/shared/models/user.model';
import * as fromApp from '../../store/app.reducers';

export interface AuthState extends fromApp.AppState {
    auth: State;
}

export interface State{
    token: string;
    authenticated: boolean;
    user: User;
}

const initialState: State = {
    token: null,
    authenticated: false,
    user: null
}
export function authReducer(state = initialState, action: AuthActions.AuthActions){
    switch (action.type){
        case (AuthActions.SIGNUP):
        case (AuthActions.SIGNIN):
            return {
                ...state,
                authenticated :true
            };
        case (AuthActions.LOGOUT):
            return {
                ...state,
                token: null,
                authenticated: false
            };
        case (AuthActions.SET_TOKEN):
            return {
                ...state,
                token: action.payload
            };
        case (AuthActions.SET_USER):
            return {
                ...state,
                user: action.payload
            };

        default:
            return state;
    }
}