import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookService } from '../../services/book.service';
import { Router } from 'express';
import * as BookActions from './book.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksEffects {
  private booksService = inject(BookService);
  private actions$ = inject(Actions);
  private router = inject(Router);

  getBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.getBooks),
      switchMap(() =>
        this.booksService.getBooks().pipe(
          map(response => BookActions.getBooksSuccess({ books: response })),
          catchError(error => of(BookActions.getBooksFailure({ error })))
        )
      )
    )
  );
}
