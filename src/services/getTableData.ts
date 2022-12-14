import { Book, BookView } from "../slices/books/booksSlice.model";

function flatTableRow(book: Book): BookView {
  const { authors, subjects, ...otherProps } = book;
  return {
    authors: authors?.join(", "),
    subjects: subjects?.join(", "),
    ...otherProps,
  };
}

export function getTableData(books: Book[]): BookView[] {
  return books?.map(flatTableRow);
}
