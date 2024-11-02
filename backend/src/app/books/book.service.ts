import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class BookService {
  constructor(private readonly httpService: HttpService) {}

  async index() {
    const booksURL = `https://openlibrary.org/search.json?author=tolkin&fields=title,cover_i&lang=en`;

    try {
      const response = await lastValueFrom(this.httpService.get(booksURL));
      const booksObj = response.data.docs;

      const books = booksObj.map(book => {
        const imgURL = book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : null;
        return {
          title: book.title,
          imgURL,
        };
      });

      return books;
    } catch (error) {
      console.error("Error fetching Author's publications:", error);
      throw new HttpException(
        "Error fetching Author's publications",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
