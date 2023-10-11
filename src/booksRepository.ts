import { Book } from "./model/book";

export interface BooksRepository {
  save(book: Book): void;
  find(query: Partial<Book>): Array<Book>;
}

export class InMemoryBooksRepository implements BooksRepository {
  private books: Book[];

  public constructor(books: Book[]) {
    this.books = books;
  }

  public find(query: Partial<Book>): Array<Book> {
    return this.findAll(this.books, query);
  }

  public save(book: Book): void {
    const index = this.books.findIndex((b) => b.isbn === book.isbn);
    this.books.splice(index, 1);
    this.books.push(book);
  }

  private findAll(entities: Array<Book>, query: Partial<Book>): Array<Book> {
    const properties = Object.getOwnPropertyNames(query);
    return entities.filter((entity) =>
      properties.every((property) => {
        const prop = property as keyof Book;
        return JSON.stringify(entity[prop]) === JSON.stringify(query[prop]);
      })
    );
  }
}
