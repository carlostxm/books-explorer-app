import { Book, BookView } from "./booksSlice.model";

export function flatTableRow(book: Book): BookView {
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
