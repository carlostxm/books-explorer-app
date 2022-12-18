import { useEffect, useMemo, useState, useCallback } from 'react';
import useBooks from '../hooks/useBooks';
import { getTableData } from '../services/getTableData';
import { BookView } from '../slices/books/booksSlice.model';
import BookDetails, { BookDetailsMode } from './BookDetails';
import BooksTable from './BooksTable';
import Modal from './Modal';

interface ModalContext {
  bookId: string;
  mode: BookDetailsMode;
}

export function Books() {
  const { books, bookMap, isLoading, deleteBook, fetchBookList, updateBook } =
    useBooks();
  const [modalContext, setModalContext] = useState<ModalContext | null>(null);

  const tableRows = useMemo(() => getTableData(books), [books]);

  const handleDeleteRow = useCallback(
    (id: string) => {
      deleteBook(id);
    },
    [deleteBook]
  );

  const handleViewRow = useCallback(
    (id: string) => {
      setModalContext({ bookId: id, mode: 'view' });
    },
    [setModalContext]
  );

  const handleEditRow = useCallback(
    (id: string) => {
      setModalContext({ bookId: id, mode: 'edit' });
    },
    [setModalContext]
  );

  const handleEditSubmit = (book: BookView) => {
    if (book) updateBook(book);
    setModalContext(null);
  };

  useEffect(() => {
    fetchBookList();
  }, [fetchBookList]);

  const selectedBook =
    modalContext !== null ? bookMap[modalContext.bookId] : null;
  const isModalOpen = modalContext !== null;

  return (
    <>
      <BooksTable
        data={tableRows}
        isLoading={isLoading}
        onDelete={handleDeleteRow}
        onView={handleViewRow}
        onEdit={handleEditRow}
      />
      <Modal open={isModalOpen} onClose={() => setModalContext(null)}>
        <BookDetails
          book={selectedBook!}
          mode={modalContext?.mode}
          onSubmit={handleEditSubmit}
        />
      </Modal>
    </>
  );
}
