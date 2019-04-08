import { Action } from '@ngrx/store';

import { User } from 'src/app/shared/models/user.model';

export const TRY_SIGNUP = 'TRY_SIGNUP';
export const SIGNUP = 'SIGNUP';
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';
export const GET_USER = 'GET_USER';
export const SET_USER = 'SET_USER';
export const CREATE_USER = 'CREATE_USER';

export class TrySignup implements Action {
  readonly type = TRY_SIGNUP;

  constructor(public payload: {useremail: string, username: string, password: string}) {}
}

export class TrySignin implements Action {
  readonly type = TRY_SIGNIN;

  constructor(public payload: {useremail: string, password: string}) {}
}

export class Signup implements Action {
  readonly type = SIGNUP;
}

export class Signin implements Action {
  readonly type = SIGNIN;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class SetToken implements Action {
    readonly type = SET_TOKEN;
  
    constructor(public payload: string) {}
}

export class GetUser implements Action {
    readonly type = GET_USER;
  
    constructor(public payload: string) {}
}

export class SetUser implements Action{
    readonly type = SET_USER;

    constructor(public payload: User){}
}

export class CreateUser implements Action {
    readonly type = CREATE_USER;
  
    constructor(public payload: {useremail: string, username: string}) {}
}

export type AuthActions = Signup | 
                          Signin | 
                          Logout | 
                          SetToken | 
                          TrySignup | 
                          TrySignin |
                          GetUser |
                          SetUser |
                          CreateUser;