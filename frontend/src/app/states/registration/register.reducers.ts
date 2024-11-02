import { createReducer, on } from '@ngrx/store';
import * as RegisterActions from './registration.actions';

export interface RegisterState {
  user: any;
  error: string | null;
}

export const initialState: RegisterState = {
  user: null,
  error: null,
};

export const registerReducer = createReducer(
  initialState,
  on(RegisterActions.registerSuccess, (state, { response }) => ({
    ...state,
    user: response.user,
    error: null,
  })),
  on(RegisterActions.registerFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
