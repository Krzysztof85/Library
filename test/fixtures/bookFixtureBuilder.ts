import { Author } from "../../src/model/author";
import { Book } from "../../src/model/book";
import { ISBN } from "../../src/model/isbn";

export default class BookFixtureBuilder {
  public static get Ulysses(): Book {
    return new Book(
      new Author("James", "Joyce"),
      "Ulysses",
      new ISBN("978-0-9767736-6-5")
    );
  }

  public static get Clay(): Book {
    return new Book(
      new Author("James", "Joyce"),
      "Clay",
      new ISBN("978-0-9767736-6-7")
    );
  }

  public static get ReferencedLeanStartup(): Book {
    return new Book(
      new Author("Eric", "Ries"),
      "The Lean Startup",
      new ISBN("978-0-9767736-6-9"),
      true
    );
  }

  public static get JoylandByStephenKing(): Book {
    return new Book(
      new Author("Stephen", "King"),
      "Joyland",
      new ISBN("978-0-9767736-6-2")
    );
  }

  public static get ItByStephenKing(): Book {
    return new Book(
      new Author("Stephen", "King"),
      "It",
      new ISBN("978-0-9767736-6-2")
    );
  }

  public static get JoylandByEmilySchultz(): Book {
    return new Book(
      new Author("Emily", "Schultz"),
      "Joyland",
      new ISBN("978-0-9767736-6-1")
    );
  }
}
