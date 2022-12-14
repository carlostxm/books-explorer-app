import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import deleteBookByIdReducer from './reducers/deleteBookById';
import filterBooksByTitleReducer from './reducers/filterBooksByTitle';
import { fetchBooks as fetchBooksFromAPI } from './booksAPI';
import { AsyncStatus, Book, BooksState } from './booksSlice.model';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const books = await fetchBooksFromAPI();
  return books;
});

const initialState: BooksState = {
  value: [],
  status: 'idle',
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    deleteBookById: deleteBookByIdReducer,
    filterBooksByTitle: filterBooksByTitleReducer,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(fetchBooks.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { deleteBookById, filterBooksByTitle } = booksSlice.actions;

export const selectBooks = (state: RootState): Book[] =>
  Object.values(state.books.value).filter(
    (book) => !book.isHidden && !book.isDeleted
  );

export const selectStatus = (state: RootState): AsyncStatus =>
  state.books.status;

export default booksSlice.reducer;
