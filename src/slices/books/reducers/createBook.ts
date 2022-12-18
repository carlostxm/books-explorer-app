import { PayloadAction } from '@reduxjs/toolkit';
import { Book, BooksState } from '../booksSlice.model';

function createBook(
  state: BooksState,
  action: PayloadAction<Book>
): BooksState {
  const { payload: newBook } = action;

  return {
    ...state,
    value: [newBook, ...state.value],
  };
}

export default createBook;
