import { PayloadAction } from '@reduxjs/toolkit';
import { Book, BooksState } from '../booksSlice.model';

function updateBook(
  state: BooksState,
  action: PayloadAction<Book>
): BooksState {
  const { payload: newBook } = action;
  const { value: currentBooks } = state;

  const currentIndex = currentBooks.findIndex(
    (currentBook) => currentBook.id === newBook.id
  );

  if (currentIndex < 0) {
    return state;
  }

  return {
    ...state,
    value: [
      ...state.value.slice(0, currentIndex),
      newBook,
      ...state.value.slice(currentIndex + 1),
    ],
  };
}

export default updateBook;
