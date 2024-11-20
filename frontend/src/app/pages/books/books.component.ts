import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { BookResponse } from '../../models/book.models';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule],
  providers: [BookService],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BookComponent {
  books: BookResponse[] = [];
  error: string | null = null;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe(
      (response: BookResponse[]) => {
        this.books = response;
      },
      error => {
        this.error = error.message;
      }
    );
  }
}
