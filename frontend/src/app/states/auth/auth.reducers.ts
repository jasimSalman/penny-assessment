import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  token: string | null;
  user: any;
  error: string | null;
  isLoggedIn: boolean;
}

export const initialState: AuthState = {
  token: null,
  user: null,
  error: null,
  isLoggedIn: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { response }) => ({
    ...state,
    token: response.token,
    user: response.user,
    isLoggedIn: true,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AuthActions.logout, state => ({
    ...state,
    token: null,
    user: null,
    isLoggedIn: false,
    error: null,
  }))
);
