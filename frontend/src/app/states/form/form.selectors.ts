import { createSelector, createFeatureSelector } from '@ngrx/store';
import { LoginFormState } from './form.reducer';

export const selectFormState = createFeatureSelector<LoginFormState>('form');
export const selectFieldErrors = (field: string) =>
  createSelector(selectFormState, state => state.errors[field]);
