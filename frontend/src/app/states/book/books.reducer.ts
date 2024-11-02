import { createReducer, on } from "@ngrx/store";
import * as BookActions  from './book.actions'
import { BookResponse } from "../../models/book.models";
export interface BooksState {
  books: BookResponse[];
  error:string | null
}

export const initialState: BooksState = {
  books: [],
  error: null,
};

export const booksReducer = createReducer(
  initialState,
  on(BookActions.getBooksSuccess, (state, { books }) => ({
    ...state,
    books, 
    error:null
  })),
  on(BookActions.getBooksFailure, (state, { error }) => ({
    ...state,
    error,
  }))

)