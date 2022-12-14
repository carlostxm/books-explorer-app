export type AsyncStatus = "idle" | "loading" | "failed";

export type Book = {
  id: string;
  title: string;
  authors: string[];
  releaseYear: number;
  editionCount: number;
  subjects: string[];
  isHidden?: boolean;
  isDeleted?: boolean;
};

export interface BookView {
  id: string;
  title: string;
  authors: string;
  releaseYear: number;
  editionCount: number;
  subjects: string;
}

export interface BooksState {
  status: AsyncStatus;
  value: Book[];
}
