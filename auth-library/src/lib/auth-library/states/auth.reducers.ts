import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  token: string | null;
  user: any;
  error: string | null;
  isLoggedIn: boolean;
  message: string | null;
}

export const initialState: AuthState = {
  token: null,
  user: null,
  error: null,
  isLoggedIn: false,
  message: null,
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
  })),
  on(
    AuthActions.generateOtp,
    AuthActions.validateOtp,
    AuthActions.resetPassword,
    state => ({
      ...state,
      message: null,
      error: null,
    })
  ),
  on(
    AuthActions.generateOtpSuccess,
    AuthActions.validateOtpSuccess,
    AuthActions.resetPasswordSuccess,
    (state, { message }) => ({
      ...state,
      message,
      error: null,
    })
  ),
  on(
    AuthActions.generateOtpFailure,
    AuthActions.validateOtpFailure,
    AuthActions.resetPasswordFailure,
    (state, { error }) => ({
      ...state,
      message: null,
      error,
    })
  ),
  on(AuthActions.registerSuccess, (state, { response }) => ({
    ...state,
    user: response.user,
    error: null,
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
