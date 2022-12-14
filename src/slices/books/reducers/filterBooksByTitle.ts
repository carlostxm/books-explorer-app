import { PayloadAction } from "@reduxjs/toolkit";
import { Book, BooksState } from "../booksSlice.model";

function filterBooks(books: Book[], text: string): Book[] {
  if (!books?.length) {
    return [];
  }

  const query = text.toLowerCase();
  return books.map((book) => ({
    ...book,
    isHidden: !book.title.toLowerCase().includes(query),
  }));
}

function filterBooksByTitle(state: BooksState, action: PayloadAction<string>) {
  const { payload: searchInput } = action;
  const { value: books } = state;

  const filteredBookList = filterBooks(books, searchInput);

  return {
    ...state,
    value: filteredBookList,
  };
}

export default filterBooksByTitle;
