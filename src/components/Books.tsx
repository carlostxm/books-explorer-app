import { useEffect, useMemo } from "react";
import useBooks from "../hooks/useBooks";
import { getTableData } from "../services/getTableData";
import BooksTable from "./BooksTable";

export function Books() {
  const { books, isLoading, deleteBook, fetchBookList } = useBooks();

  const tableRows = useMemo(() => getTableData(books), [books]);

  function handleDeleteRow(id: string) {
    deleteBook(id);
  }

  useEffect(() => {
    fetchBookList();
  }, [fetchBookList]);

  return (
    <BooksTable
      data={tableRows}
      isLoading={isLoading}
      onDelete={handleDeleteRow}
    />
  );
}
