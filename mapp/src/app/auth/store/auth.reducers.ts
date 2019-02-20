import * as AuthActions from "./auth.actions";
import { User } from 'src/app/shared/models/user.model';

export interface State{
    token: string;
    authenticated: boolean;
    user: User;
    error: string;
}
const initialState: State = {
    token: null,
    authenticated: false,
    user: null,
    error: null
}
export function authReducer(state = initialState, action: AuthActions.AuthActions){
    switch (action.type){
        case (AuthActions.SIGNUP):
        case (AuthActions.SIGNIN):
            return {
                ...state,
                authenticated :true,
                error: null
            };
        case (AuthActions.LOGOUT):
            return {
                ...state,
                token: null,
                authenticated: false,
                error: null
            };
        case (AuthActions.SET_TOKEN):
            return {
                ...state,
                token: action.payload,
                error: null
            };
        case (AuthActions.SET_USER):
            return {
                ...state,
                user: action.payload,
                error: null
            };
        case (AuthActions.FAIL):
            return {
                ...state,
                error: action.payload
            };

        default:
            return state;
    }
}