import { ISBN } from "./isbn";
import { Author } from "./author";
import BorrowingReferenceBookError from "./errors/borrowingReferenceBookError";
import BookAlreadyBorrowedError from "./errors/bookAlreadyBorrowedError";

export class Book {
  readonly author: Author;
  readonly title: string;
  readonly isbn: ISBN;
  readonly borrowed: boolean;
  private reference: boolean;

  public constructor(
    author: Author,
    title: string,
    isbn: ISBN,
    isReference: boolean = false,
    isBorrowed: boolean = false
  ) {
    this.author = author;
    this.title = title;
    this.isbn = isbn;
    this.reference = isReference;
    this.borrowed = isBorrowed;
  }

  public borrow(): Book {
    if (this.reference) throw new BorrowingReferenceBookError();
    if (this.borrowed) throw new BookAlreadyBorrowedError();
    return new Book(this.author, this.title, this.isbn, this.reference, true);
  }
}
