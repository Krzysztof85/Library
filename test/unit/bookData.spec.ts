import { BookData } from "../../src/bookData";
import { Author } from "../../src/model/author";
import { Book } from "../../src/model/book";
import { ISBN } from "../../src/model/isbn";

describe("Book Data should", () => {
  test("create book data from book ", () => {
    const isbn = new ISBN("978-0-9767736-6-5");
    const author = new Author("James", "Joyce");
    const title = "Ulysses";
    const expectedBookData = new BookData(author, title, isbn);

    const bookData = BookData.CreateFrom(new Book(author, title, isbn));

    expect(bookData).toEqual(expectedBookData);
  });

  test("create book data from borrowed book ", () => {
    const isbn = new ISBN("978-0-9767736-6-5");
    const author = new Author("James", "Joyce");
    const title = "Ulysses";
    const borrowed = true;
    const expectedBookData = new BookData(author, title, isbn, borrowed);

    const bookData = BookData.CreateFrom(
      new Book(author, title, isbn, false, borrowed)
    );

    expect(bookData).toEqual(expectedBookData);
  });
});
