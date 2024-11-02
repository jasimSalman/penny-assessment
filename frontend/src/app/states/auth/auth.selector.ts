import { createSelector } from '@ngrx/store';
export const selectLoginState = (state: any) => state.login;

export const selectToken = createSelector(
  selectLoginState,
  state => state.token
);
export const selectError = createSelector(
  selectLoginState,
  state => state.error
);
