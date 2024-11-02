import { createAction, props } from '@ngrx/store';
import {
  RegisterRequest,
  RegisterResponse,
} from '../../models/register.models';

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
