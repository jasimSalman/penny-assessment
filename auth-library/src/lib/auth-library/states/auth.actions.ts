import { createAction, props } from '@ngrx/store';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../models/auth.models';

export const login = createAction(
  '[Auth] Login',
  props<{ credentials: LoginRequest }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ response: LoginResponse; redirect: boolean }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

export const autoLogin = createAction('[Auth] Auto Login');

export const logout = createAction('[Auth] Logout');

///////////////////////////////////////////////////

export const generateOtp = createAction(
  '[Auth] Generate OTP',
  props<{ username: string }>()
);

export const generateOtpSuccess = createAction(
  '[Auth] Generate OTP Success',
  props<{ message: string }>()
);

export const generateOtpFailure = createAction(
  '[Auth] Generate OTP Failure',
  props<{ error: string }>()
);

export const validateOtp = createAction(
  '[Auth] Validate OTP',
  props<{ username: string; otp: string }>()
);

export const validateOtpSuccess = createAction(
  '[Auth] Validate OTP Success',
  props<{ message: string }>()
);

export const validateOtpFailure = createAction(
  '[Auth] Validate OTP Failure',
  props<{ error: string }>()
);

export const resetPassword = createAction(
  '[Auth] Reset Password',
  props<{ username: string; newPassword: string }>()
);

export const resetPasswordSuccess = createAction(
  '[Auth] Reset Password Success',
  props<{ message: string }>()
);

export const resetPasswordFailure = createAction(
  '[Auth] Reset Password Failure',
  props<{ error: string }>()
);

///////////////////////////////////////////////////

export const register = createAction(
  '[Register] Registration',
  props<{ credentials: RegisterRequest }>()
);

export const registerSuccess = createAction(
  '[Register] Registration Success',
  props<{ response: RegisterResponse }>()
);

export const registerFailure = createAction(
  '[Register] Registration Failure',
  props<{ error: any }>()
);
