import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getTableData } from "./Books.adapters";
import { fetchBooks, selectBooks, selectStatus, deleteBookById } from "./booksSlice";
import BooksTable from "./BooksTable";

function useBooks() {
  const books = useAppSelector(selectBooks);
  const status = useAppSelector(selectStatus);

  const dispatch = useAppDispatch();

  function deleteBook (id: string){
    dispatch(deleteBookById(id));
  }

  useEffect(() => {
    dispatch(fetchBooks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLoading = status === "loading";

  return { books, isLoading, deleteBook };
}

export function Books() {
  const { books, isLoading, deleteBook } = useBooks();

  const tableRows = useMemo(() => getTableData(books), [books]);

  function handleDeleteRow(id: string) {
    deleteBook(id);
  }

  return <BooksTable data={tableRows} isLoading={isLoading} onDelete={handleDeleteRow} />;
}
