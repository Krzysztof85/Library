import { BookData } from "../../src/bookData";
import { Author } from "../../src/model/author";
import { ISBN } from "../../src/model/isbn";

export default class BookDataFixtureBuilder {
  public static get Ulysses(): BookData {
    return new BookData(
      new Author("James", "Joyce"),
      "Ulysses",
      new ISBN("978-0-9767736-6-5")
    );
  }

  public static get BorrowedUlysses(): BookData {
    return new BookData(
      new Author("James", "Joyce"),
      "Ulysses",
      new ISBN("978-0-9767736-6-5"),
      true
    );
  }

  public static get Clay(): BookData {
    return new BookData(
      new Author("James", "Joyce"),
      "Clay",
      new ISBN("978-0-9767736-6-7")
    );
  }

  public static get JoylandByStephenKing(): BookData {
    return new BookData(
      new Author("Stephen", "King"),
      "Joyland",
      new ISBN("978-0-9767736-6-2")
    );
  }

  public static get JoylandByEmilySchultz(): BookData {
    return new BookData(
      new Author("Emily", "Schultz"),
      "Joyland",
      new ISBN("978-0-9767736-6-1")
    );
  }
}
