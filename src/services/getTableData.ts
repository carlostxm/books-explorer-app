import { Book, BookTableView } from '../slices/books/booksSlice.model';

function flatTableRow(book: Book): BookTableView {
  const { authors, subjects, ...otherProps } = book;
  return {
    authors: authors?.join(', '),
    subjects: subjects?.join(', '),
    ...otherProps,
  };
}

export function getTableData(books: Book[]): BookTableView[] {
  return books?.map(flatTableRow);
}

export function getBookMap<T extends { id: string }>(
  books: T[]
): Record<string, T> {
  let booksById: Record<string, T> = {};

  for (const book of books) {
    booksById[book.id] = book;
  }

  return booksById;
}
