import { useMemo } from "react";
import useBooks from '../hooks/useBooks';
import { getTableData } from '../services/getTableData';
import BooksTable from "./BooksTable";

export function Books() {
  const { books, isLoading, deleteBook } = useBooks();

  const tableRows = useMemo(() => getTableData(books), [books]);

  function handleDeleteRow(id: string) {
    deleteBook(id);
  }

  return <BooksTable data={tableRows} isLoading={isLoading} onDelete={handleDeleteRow} />;
}
