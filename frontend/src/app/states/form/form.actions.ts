import { createAction, props } from '@ngrx/store';

export const loginFormChanged = createAction(
  '[Login] Form Changed',
  props<{ username: string; password: string }>()
);

export const loginFormValidationFailed = createAction(
  '[Login] Validation Failed',
  props<{ errors: any }>()
);

export const registerFormChanged = createAction(
  '[Register] Form Changed',
  props<{
    username: string;
    password: string;
    email: string;
    confPassword: string;
  }>()
);

export const registerFormValidationFailed = createAction(
  '[Register] Validation Failed',
  props<{ errors: any }>()
);
