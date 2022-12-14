import { useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  selectBooks,
  selectStatus,
  deleteBookById,
  fetchBooks,
  filterBooksByTitle,
} from '../slices/books/booksSlice';

function useBooks() {
  const books = useAppSelector(selectBooks);
  const status = useAppSelector(selectStatus);

  const dispatch = useAppDispatch();

  const deleteBook = useCallback(
    (id: string) => {
      dispatch(deleteBookById(id));
    },
    [dispatch]
  );

  const searchBooks = useCallback(
    (text: string) => {
      dispatch(filterBooksByTitle(text));
    },
    [dispatch]
  );

  const fetchBookList = useCallback(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const isLoading = status === 'loading';

  return { books, isLoading, deleteBook, searchBooks, fetchBookList };
}

export default useBooks;
