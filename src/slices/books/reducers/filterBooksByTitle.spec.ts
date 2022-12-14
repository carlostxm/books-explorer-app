import filterBooksByTitle from "./filterBooksByTitle";
import { Book, BooksState } from "../booksSlice.model";

const BOOKS: Book[] = [
  {
    authors: ["Bob", "Alice"],
    title: "Software Engineering",
    releaseYear: 1999,
    editionCount: 2,
    subjects: ["Programming"],
    id: "software-engineering-101",
  },
  {
    authors: ["Robert C. Martin"],
    title: "Clean Architecture",
    releaseYear: 2018,
    editionCount: 24,
    subjects: ["Programming", "Architecture"],
    id: "clean-architecture-uncle-bob",
  },
];

const initialState: BooksState = {
  value: BOOKS,
  status: "idle",
};

describe("filterBooksByTitle", () => {
  it("should set isHidden field if the query matches a book title", () => {
    const { value: result } = filterBooksByTitle(initialState, {
      payload: "Software",
      type: "books/filterBooksByTitle",
    });
    const visibleBooks = result.filter((book) => !book.isHidden);
    expect(visibleBooks.length).toBe(1);
    const hiddenBooks = result.filter((book) => book.isHidden);
    expect(hiddenBooks.length).toBe(1);
  });

  it("should lookup be case insensitive", () => {
    const { value: result } = filterBooksByTitle(initialState, {
      payload: "SOFTWARE",
      type: "books/filterBooksByTitle",
    });
    const visibleBooks = result.filter((book) => !book.isHidden);
    expect(visibleBooks.length).toBe(1);
    const hiddenBooks = result.filter((book) => book.isHidden);
    expect(hiddenBooks.length).toBe(1);
  });
});
