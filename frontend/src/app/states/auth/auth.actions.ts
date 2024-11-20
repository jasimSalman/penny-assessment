import { createAction, props } from '@ngrx/store';
import { LoginRequest, LoginResponse } from '../../models/auth.models';

export const login = createAction(
  '[Auth] Login',
  props<{ credentials: LoginRequest }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ response: LoginResponse ,redirect:boolean }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

export const autoLogin = createAction('[Auth] Auto Login');

export const logout = createAction('[Auth] Logout');


