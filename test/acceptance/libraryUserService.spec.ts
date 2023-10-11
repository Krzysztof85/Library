import { LibraryUserService } from "../../src/libraryUserService";
import { InMemoryBooksRepository } from "../../src/booksRepository";
import BorrowingReferenceBookError from "../../src/model/errors/borrowingReferenceBookError";
import BookFixtureBuilder from "../fixtures/bookFixtureBuilder";
import BookDataFixtureBuilder from "../fixtures/bookDataFixtureBuilder";

describe("As a library user", () => {
  test("I would like to be able to find books by my favourite author, so that I know if they are available in the library", () => {
    const bookWithAuthorToFind = BookFixtureBuilder.Ulysses;
    const author = bookWithAuthorToFind.author;
    const repository = new InMemoryBooksRepository([
      bookWithAuthorToFind,
      BookFixtureBuilder.Clay,
      BookFixtureBuilder.ReferencedLeanStartup,
    ]);
    const libraryService = new LibraryUserService(repository);

    const books = libraryService.findBooksByAuthor(author);

    expect(books).toEqual([
      BookDataFixtureBuilder.Ulysses,
      BookDataFixtureBuilder.Clay,
    ]);
  });

  test("I would like to be able to find books by title, so that I know if they are available in the library", () => {
    const bookWithTitleToFind = BookFixtureBuilder.JoylandByStephenKing;
    const title = bookWithTitleToFind.title;
    const allBooks = [
      bookWithTitleToFind,
      BookFixtureBuilder.ItByStephenKing,
      BookFixtureBuilder.JoylandByEmilySchultz,
      BookFixtureBuilder.ReferencedLeanStartup,
    ];
    const repository = new InMemoryBooksRepository(allBooks);
    const libraryService = new LibraryUserService(repository);

    const books = libraryService.findBooksByTitle(title);

    expect(books).toEqual([
      BookDataFixtureBuilder.JoylandByStephenKing,
      BookDataFixtureBuilder.JoylandByEmilySchultz,
    ]);
  });

  test("I would like to be able to find books by ISBN, so that I know if they are available in the library", () => {
    const bookToFind = BookFixtureBuilder.JoylandByStephenKing;
    const allBooks = [
      bookToFind,
      BookFixtureBuilder.ItByStephenKing,
      BookFixtureBuilder.JoylandByEmilySchultz,
      BookFixtureBuilder.ReferencedLeanStartup,
    ];
    const repository = new InMemoryBooksRepository(allBooks);
    const libraryService = new LibraryUserService(repository);

    const book = libraryService.findBookByISBN(bookToFind.isbn);

    expect(book).toEqual(BookDataFixtureBuilder.JoylandByStephenKing);
  });

  test("I would like to be able to borrow a book, so I can read it at home", () => {
    const book = BookFixtureBuilder.Ulysses;
    const repository = new InMemoryBooksRepository([book]);
    const libraryService = new LibraryUserService(repository);

    libraryService.borrow(book.isbn);

    expect(libraryService.findBookByISBN(book.isbn)).toStrictEqual(
      BookDataFixtureBuilder.BorrowedUlysses
    );
  });

  test("I should be prevented from borrowing reference books, so that they are always available", () => {
    const referenceBook = BookFixtureBuilder.ReferencedLeanStartup;
    const repository = new InMemoryBooksRepository([referenceBook]);
    const libraryService = new LibraryUserService(repository);

    expect(() => libraryService.borrow(referenceBook.isbn)).toThrowError(
      BorrowingReferenceBookError
    );
  });
});
