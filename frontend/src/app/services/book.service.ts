import { Store } from '@ngrx/store';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'frontend/src/enviroments/environment';
import { Observable } from 'rxjs';
import { BookResponse } from '../models/book.models';
import * as BookActions from '../states/book/book.actions';
import * as BookSelectors from '../states/book/book.selector';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  books$!: Observable<BookResponse[]>;

  constructor(private store: Store) {
    this.store.dispatch(BookActions.getBooks());
    this.books$ = this.store.select(BookSelectors.selectBooks);
  }

  getBooks(): Observable<BookResponse[]> {
    return this.http.get<BookResponse[]>(`${this.apiUrl}/book`);
  }
}
