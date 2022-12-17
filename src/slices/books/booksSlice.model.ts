export type AsyncStatus = 'idle' | 'loading' | 'failed';

export interface Book {
  id: string;
  title: string;
  authors: string[];
  releaseYear: number;
  editionCount: number;
  subjects: string[];
  isHidden?: boolean;
  isDeleted?: boolean;
}

export type BookView = Omit<Book, 'isHidden' | 'isDeleted'>;

export interface BookTableView {
  id: string;
  title: string;
  authors: string;
  releaseYear: number;
  editionCount: number;
  subjects: string;
}

export type BookDetails = Omit<Book, 'isHidden' | 'isDeleted'>;

export interface BooksState {
  status: AsyncStatus;
  value: Book[];
}
