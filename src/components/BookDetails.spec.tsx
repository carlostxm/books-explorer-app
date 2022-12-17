import BookDetails from './BookDetails';
import { render, screen } from '@testing-library/react';
import { BookView } from '../slices/books/booksSlice.model';

describe('BookDetails', () => {
  it('should render all book fields', () => {
    const book: BookView = {
      id: '1',
      title: 'Clean Architecture',
      authors: ['Robert C. Martin'],
      subjects: ['Software', 'Architecture'],
      releaseYear: 2012,
      editionCount: 15,
    };
    render(<BookDetails book={book} />);
    expect(screen.getByDisplayValue(book.title)).toBeInTheDocument();
    expect(screen.getByDisplayValue(book.releaseYear)).toBeInTheDocument();
    expect(screen.getByDisplayValue(book.editionCount)).toBeInTheDocument();
    book.authors.forEach((author) =>
      expect(screen.getByDisplayValue(author)).toBeInTheDocument()
    );
    book.subjects.forEach((subject) =>
      expect(screen.getByDisplayValue(subject)).toBeInTheDocument()
    );
  });
});
