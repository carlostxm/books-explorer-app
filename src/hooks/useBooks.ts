import { useCallback, useMemo } from 'react';
import { useAppSelector } from '../store/hooks';
import {
  selectBooks,
  selectStatus,
  deleteBookById,
  fetchBooks,
  filterBooksByTitle,
  updateBook as updateBookAction,
  createBook as createBookAction,
} from '../slices/books/booksSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { getBookMap } from '../services/getTableData';
import { BookView } from '../slices/books/booksSlice.model';

function useBooks() {
  const books = useAppSelector(selectBooks);
  const status = useAppSelector(selectStatus);

  const dispatch = useDispatch<AppDispatch>();

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

  const updateBook = useCallback(
    (book: BookView) => {
      dispatch(updateBookAction(book));
    },
    [dispatch]
  );

  const createBook = useCallback(
    (book: BookView) => {
      dispatch(createBookAction(book));
    },
    [dispatch]
  );

  const bookMap = useMemo(() => getBookMap<BookView>(books), [books]);

  const isLoading = status === 'loading';

  return {
    books,
    bookMap,
    isLoading,
    deleteBook,
    searchBooks,
    fetchBookList,
    updateBook,
    createBook,
  };
}

export default useBooks;
