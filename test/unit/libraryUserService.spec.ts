import { BooksRepository } from "../../src/booksRepository";
import { LibraryUserService } from "../../src/libraryUserService";
import { mock } from "jest-mock-extended";
import BookAlreadyBorrowedError from "../../src/model/errors/bookAlreadyBorrowedError";
import BorrowingReferenceBookError from "../../src/model/errors/borrowingReferenceBookError";
import BookFixtureBuilder from "../fixtures/bookFixtureBuilder";
import BookDataFixtureBuilder from "../fixtures/bookDataFixtureBuilder";

describe("Library User Service should", () => {
  test("search for the author in repository", () => {
    const author = BookFixtureBuilder.Ulysses.author;
    const repository = mock<BooksRepository>();
    repository.find.mockReturnValue([]);
    const libraryService = new LibraryUserService(repository);

    libraryService.findBooksByAuthor(author);

    expect(repository.find).toHaveBeenCalledWith({ author });
  });

  test("return no books when no books of an author are available", () => {
    const author = BookFixtureBuilder.Ulysses.author;
    const repository = mock<BooksRepository>();
    repository.find.mockReturnValue([]);
    const libraryService = new LibraryUserService(repository);

    const books = libraryService.findBooksByAuthor(author);

    expect(books).toHaveLength(0);
  });

  test("return books when books of an author are available", () => {
    const author = BookFixtureBuilder.Ulysses.author;
    const repository = mock<BooksRepository>();
    repository.find.mockReturnValue([
      BookFixtureBuilder.Ulysses,
      BookFixtureBuilder.Clay,
    ]);
    const libraryService = new LibraryUserService(repository);

    const books = libraryService.findBooksByAuthor(author);

    expect(books).toEqual([
      BookDataFixtureBuilder.Ulysses,
      BookDataFixtureBuilder.Clay,
    ]);
  });

  test("search for the title in repository", () => {
    const title = BookFixtureBuilder.Ulysses.title;
    const repository = mock<BooksRepository>();
    repository.find.mockReturnValue([]);
    const libraryService = new LibraryUserService(repository);

    libraryService.findBooksByTitle(title);

    expect(repository.find).toHaveBeenCalledWith({ title });
  });

  test("return no books when no books of the given title are available", () => {
    const title = BookFixtureBuilder.Ulysses.title;
    const repository = mock<BooksRepository>();
    repository.find.mockReturnValue([]);
    const libraryService = new LibraryUserService(repository);

    const books = libraryService.findBooksByTitle(title);

    expect(books).toHaveLength(0);
  });

  test("return books when books of the given title are available", () => {
    const book = BookFixtureBuilder.Ulysses;
    const repository = mock<BooksRepository>();
    repository.find.mockReturnValue([book]);
    const libraryService = new LibraryUserService(repository);

    const books = libraryService.findBooksByTitle(book.title);

    expect(books).toEqual([BookDataFixtureBuilder.Ulysses]);
  });

  test("search for the ISBN in repository", () => {
    const isbn = BookFixtureBuilder.Ulysses.isbn;
    const repository = mock<BooksRepository>();
    repository.find.mockReturnValue([]);
    const libraryService = new LibraryUserService(repository);

    libraryService.findBookByISBN(isbn);

    expect(repository.find).toHaveBeenCalledWith({ isbn });
  });

  test("not return a book when there is no book for the given ISBN", () => {
    const isbn = BookFixtureBuilder.Ulysses.isbn;
    const repository = mock<BooksRepository>();
    repository.find.mockReturnValue([]);
    const libraryService = new LibraryUserService(repository);

    const book = libraryService.findBookByISBN(isbn);

    expect(book).toBe(undefined);
  });

  test("return a book for a given ISBN", () => {
    const book = BookFixtureBuilder.Ulysses;
    const repository = mock<BooksRepository>();
    repository.find.mockReturnValue([book]);
    const libraryService = new LibraryUserService(repository);

    const retrievedBook = libraryService.findBookByISBN(book.isbn);

    expect(retrievedBook).toEqual(BookDataFixtureBuilder.Ulysses);
  });

  test("throw an error when customer tries to borrow a borrowed book", () => {
    const book = BookFixtureBuilder.Ulysses;
    const repository = mock<BooksRepository>();
    const borrowedBook = book.borrow();
    repository.find.mockReturnValue([borrowedBook]);
    const libraryService = new LibraryUserService(repository);

    expect(() => libraryService.borrow(book.isbn)).toThrowError(
      BookAlreadyBorrowedError
    );
  });

  test("throw an error when the user would like to borrow a referenced book", () => {
    const book = BookFixtureBuilder.ReferencedLeanStartup;
    const repository = mock<BooksRepository>();
    repository.find.mockReturnValue([book]);
    const libraryService = new LibraryUserService(repository);

    expect(() => libraryService.borrow(book.isbn)).toThrowError(
      BorrowingReferenceBookError
    );
  });
});
