import { LibraryOwnerService } from "../../src/libraryOwnerService";
import { InMemoryBooksRepository } from "../../src/booksRepository";
import BookFixtureBuilder from "../fixtures/bookFixtureBuilder";
import { LibraryUserService } from "../../src/libraryUserService";

describe("As a library owner", () => {
  test("I would like to know how many books are being borrowed", () => {
    const booksToBorrow = [BookFixtureBuilder.Ulysses, BookFixtureBuilder.Clay];
    const allBooks = booksToBorrow.concat([BookFixtureBuilder.ItByStephenKing]);
    const repository = new InMemoryBooksRepository(allBooks);
    const libraryOwnerService = new LibraryOwnerService(repository);
    const libraryUserService = new LibraryUserService(repository);
    for (var bookToBorrow of booksToBorrow) {
      libraryUserService.borrow(bookToBorrow.isbn);
    }

    const numberOfBorrowedBooks = libraryOwnerService.countBorrowedBooks();

    expect(numberOfBorrowedBooks).toEqual(booksToBorrow.length);
  });
});
