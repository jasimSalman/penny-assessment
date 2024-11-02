import { createAction, props } from '@ngrx/store';
import { BookResponse } from '../../models/book.models';

export const getBooks = createAction('[Book Component] Get Books ');

export const getBooksSuccess = createAction(
  '[Book Component] Get Books Success',
  props<{ books: BookResponse[] }>()
);

export const getBooksFailure = createAction(
  '[Book Component] Get Books Failure',
  props<{ error: string }>()
);
