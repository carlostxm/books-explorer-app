import { useEffect, useMemo, useState, useCallback } from 'react';
import useBooks from '../hooks/useBooks';
import { getTableData } from '../services/getTableData';
import BookDetails from './BookDetails';
import BooksTable from './BooksTable';
import Modal from './Modal';

export function Books() {
  const { books, bookMap, isLoading, deleteBook, fetchBookList } = useBooks();
  const [bookSelectedId, setBookSelectedId] = useState<string | null>(null);

  const tableRows = useMemo(() => getTableData(books), [books]);

  const handleDeleteRow = useCallback(
    (id: string) => {
      deleteBook(id);
    },
    [deleteBook]
  );

  const handleViewRow = useCallback(
    (id: string) => {
      setBookSelectedId(id);
    },
    [setBookSelectedId]
  );

  useEffect(() => {
    fetchBookList();
  }, [fetchBookList]);

  const selectedBook = bookSelectedId !== null ? bookMap[bookSelectedId] : null;
  const isModalOpen = bookSelectedId !== null;

  return (
    <>
      <BooksTable
        data={tableRows}
        isLoading={isLoading}
        onDeleteClick={handleDeleteRow}
        onViewClick={handleViewRow}
      />
      <Modal open={isModalOpen} onClose={() => setBookSelectedId(null)}>
        <BookDetails book={selectedBook!} />
      </Modal>
    </>
  );
}
