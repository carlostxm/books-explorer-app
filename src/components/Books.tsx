import { useEffect, useMemo, useState, useCallback } from 'react';
import useBooks from '../hooks/useBooks';
import { getTableData } from '../services/getTableData';
import { BookView } from '../slices/books/booksSlice.model';
import BookDetails from './BookDetails';
import BooksTable from './BooksTable';
import BooksTableToolbar from './BooksTableToolbar';
import Modal from './Modal';

interface ViewAndEditModalContext {
  bookId: string;
  mode: 'edit' | 'view';
}

interface CreateModalContext {
  mode: 'create';
}

type ModalContext = ViewAndEditModalContext | CreateModalContext;

export function Books() {
  const {
    books,
    bookMap,
    isLoading,
    deleteBook,
    fetchBookList,
    updateBook,
    createBook,
  } = useBooks();
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

  const handleCreate = () => {
    setModalContext({ mode: 'create' });
  };

  const handleFormSubmit = (book: BookView) => {
    if (book) {
      switch (modalContext?.mode) {
        case 'edit':
          updateBook(book);
          break;
        case 'create':
          createBook(book);
          break;
        default:
          break;
      }
    }
    setModalContext(null);
  };

  useEffect(() => {
    fetchBookList();
  }, [fetchBookList]);

  const selectedBook =
    modalContext?.mode !== 'create' && modalContext?.bookId
      ? bookMap[modalContext.bookId]
      : null;
  const isModalOpen = modalContext !== null;

  return (
    <>
      <BooksTableToolbar onCreate={handleCreate}>
        <BooksTable
          data={tableRows}
          isLoading={isLoading}
          onDelete={handleDeleteRow}
          onView={handleViewRow}
          onEdit={handleEditRow}
        />
      </BooksTableToolbar>
      <Modal open={isModalOpen} onClose={() => setModalContext(null)}>
        <BookDetails
          book={selectedBook!}
          mode={modalContext?.mode}
          onSubmit={handleFormSubmit}
        />
      </Modal>
    </>
  );
}
