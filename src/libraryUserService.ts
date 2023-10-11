import { ISBN } from "./model/isbn";
import { Author } from "./model/author";
import { BooksRepository } from "./booksRepository";
import { BookData } from "./bookData";
import { Book } from "./model/book";

export class LibraryUserService {
  private repository: BooksRepository;

  public constructor(repository: BooksRepository) {
    this.repository = repository;
  }

  public findBooksByAuthor(author: Author): BookData[] {
    const query = { author } as Partial<Book>;
    const books = this.repository.find(query);
    return books.map((book) => BookData.CreateFrom(book));
  }

  public findBooksByTitle(title: string): BookData[] {
    const query = { title } as Partial<Book>;
    const books = this.repository.find(query);
    return books.map((book) => BookData.CreateFrom(book));
  }

  public findBookByISBN(isbn: ISBN): BookData | undefined {
    const book = this.findBookBy(isbn);
    if (!book) return;
    return BookData.CreateFrom(book);
  }

  public borrow(isbn: ISBN): void {
    const book = this.findBookBy(isbn);
    if (!book) return;
    const borrowedBook = book.borrow();
    this.repository.save(borrowedBook);
  }

  private findBookBy(isbn: ISBN): Book | undefined {
    const query = { isbn } as Partial<Book>;
    const books = this.repository.find(query);
    if (books.length === 0) return;
    return books[0];
  }
}
