import { useCallback, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectBooks, selectStatus, deleteBookById, fetchBooks, filterBooksByTitle } from '../features/books/booksSlice';

function useBooks() {
    const books = useAppSelector(selectBooks);
    const status = useAppSelector(selectStatus);
  
    const dispatch = useAppDispatch();
  
    const deleteBook = useCallback((id: string) => {
        dispatch(deleteBookById(id));
    }, [dispatch]);

    const searchBooks = useCallback((text: string) => {
        dispatch(filterBooksByTitle(text));
    }, [dispatch]);
  
    useEffect(() => {
      dispatch(fetchBooks());
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    const isLoading = status === "loading";
  
    return { books, isLoading, deleteBook, searchBooks };
}
  
export default useBooks;