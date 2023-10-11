import { BooksRepository } from "./booksRepository";
import { Book } from "./model/book";

export class LibraryOwnerService {
  private repository: BooksRepository;

  public constructor(repository: BooksRepository) {
    this.repository = repository;
  }

  public countBorrowedBooks(): number {
    const query = { borrowed: true } as Partial<Book>;
    const books = this.repository.find(query);
    return books.length;
  }
}
