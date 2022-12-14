import { PayloadAction } from "@reduxjs/toolkit";
import { BooksState } from "../booksSlice";

function deleteBookById(
  state: BooksState,
  action: PayloadAction<string>
): BooksState {
  const actionId = action.payload;
  const bookIndex = state.value.findIndex((book) => book.id === actionId);

  if (bookIndex < 0) {
    return state;
  }

  return {
    ...state,
    value: [
      ...state.value.slice(0, bookIndex),
      ...state.value.slice(bookIndex + 1),
    ],
  };
}

export default deleteBookById;