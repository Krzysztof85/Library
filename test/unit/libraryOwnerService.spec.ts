import { InMemoryBooksRepository } from "../../src/booksRepository";
import { mock } from "jest-mock-extended";
import BookFixtureBuilder from "../fixtures/bookFixtureBuilder";
import { LibraryOwnerService } from "../../src/libraryOwnerService";

describe("Library Owner Service should", () => {
  test("call repository for borrowed books", () => {
    const repository = mock<InMemoryBooksRepository>();
    repository.find.mockReturnValue([]);
    const libraryService = new LibraryOwnerService(repository);

    libraryService.countBorrowedBooks();

    expect(repository.find).toHaveBeenCalledWith({ borrowed: true });
  });

  test("return zero when repository doesnt return any book", () => {
    const repository = mock<InMemoryBooksRepository>();
    repository.find.mockReturnValue([]);
    const libraryService = new LibraryOwnerService(repository);

    const numberOfBorrowedBooks = libraryService.countBorrowedBooks();

    expect(numberOfBorrowedBooks).toBe(0);
  });

  test("return one borrowed book when repository returns one book", () => {
    const repository = mock<InMemoryBooksRepository>();
    repository.find.mockReturnValue([BookFixtureBuilder.Ulysses]);
    const libraryService = new LibraryOwnerService(repository);

    const numberOfBorrowedBooks = libraryService.countBorrowedBooks();

    expect(numberOfBorrowedBooks).toBe(1);
  });

  test("return 5 borrowed book when repository returns 5 books", () => {
    const borrowedBooks = [
      BookFixtureBuilder.Ulysses,
      BookFixtureBuilder.Clay,
      BookFixtureBuilder.ItByStephenKing,
      BookFixtureBuilder.JoylandByEmilySchultz,
      BookFixtureBuilder.JoylandByStephenKing,
    ];
    const repository = mock<InMemoryBooksRepository>();
    repository.find.mockReturnValue(borrowedBooks);
    const libraryService = new LibraryOwnerService(repository);

    const numberOfBorrowedBooks = libraryService.countBorrowedBooks();

    expect(numberOfBorrowedBooks).toBe(borrowedBooks.length);
  });
});
