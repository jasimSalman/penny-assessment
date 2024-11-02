import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BooksState } from './books.reducer';

export const selectBookState = createFeatureSelector<BooksState>('books');

export const selectBooks = createSelector(
  selectBookState,
  (state: BooksState) => state.books
);

export const selectError = createSelector(
  selectBookState,
  (state: BooksState) => state.error
);
