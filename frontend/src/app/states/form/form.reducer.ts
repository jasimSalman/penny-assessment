import { createReducer, on } from '@ngrx/store';
import {
  loginFormChanged,
  loginFormValidationFailed,
  registerFormChanged,
  registerFormValidationFailed,
} from './form.actions';

export interface LoginFormState {
  username: string;
  password: string;
  email: string;
  confPassword: string;
  errors: { [key: string]: string | null };
}

export const initialState: LoginFormState = {
  username: '',
  password: '',
  email: '',
  confPassword: '',
  errors: {},
};

export const loginReducer = createReducer(
  initialState,
  on(loginFormChanged, (state, { username, password }) => ({
    ...state,
    username,
    password,
    errors: {},
  })),
  on(loginFormValidationFailed, (state, { errors }) => ({
    ...state,
    errors: { ...state.errors, ...errors },
  }))
);

export const registerReducer = createReducer(
  initialState,
  on(
    registerFormChanged,
    (state, { username, password, email, confPassword }) => ({
      ...state,
      username,
      password,
      email,
      confPassword,
      errors: {},
    })
  ),
  on(registerFormValidationFailed, (state, { errors }) => ({
    ...state,
    errors: { ...state.errors, ...errors },
  }))
);
