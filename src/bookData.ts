import { Author } from "./model/author";
import { Book } from "./model/book";
import { ISBN } from "./model/isbn";

export class BookData {
  readonly author: Author;
  readonly title: string;
  readonly isbn: ISBN;
  readonly borrowed: boolean;

  public constructor(
    author: Author,
    title: string,
    isbn: ISBN,
    borrowed: boolean = false
  ) {
    this.author = author;
    this.title = title;
    this.isbn = isbn;
    this.borrowed = borrowed;
  }

  public static CreateFrom(book: Book): BookData {
    return new BookData(book.author, book.title, book.isbn, book.borrowed);
  }
}
