import BookDetails from './BookDetails';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookView } from '../slices/books/booksSlice.model';

const INITIAL_VALUE: BookView = {
  id: '1',
  title: 'Clean Architecture',
  authors: ['Robert C. Martin'],
  subjects: ['Software', 'Architecture'],
  releaseYear: 2012,
  editionCount: 15,
};

describe('BookDetails', () => {
  it('should render all book fields', () => {
    render(<BookDetails book={INITIAL_VALUE} mode='view' />);
    expect(screen.getByDisplayValue(INITIAL_VALUE.title)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(INITIAL_VALUE.releaseYear)
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(INITIAL_VALUE.editionCount)
    ).toBeInTheDocument();
    INITIAL_VALUE.authors.forEach((author) =>
      expect(screen.getByDisplayValue(author)).toBeInTheDocument()
    );
    INITIAL_VALUE.subjects.forEach((subject) =>
      expect(screen.getByDisplayValue(subject)).toBeInTheDocument()
    );
  });

  it('should use mode "view" by default if mode property is not specified', () => {
    render(<BookDetails book={INITIAL_VALUE} />);
    expect(screen.queryByText(/save changes/i)).not.toBeInTheDocument();
  });

  it('should submit form changes when submit button is clicked', async () => {
    const onSubmitMock = jest.fn();
    render(
      <BookDetails book={INITIAL_VALUE} mode='edit' onSubmit={onSubmitMock} />
    );

    const user = userEvent.setup();
    await user.clear(screen.getByLabelText(/title/i));
    await user.type(screen.getByLabelText(/title/i), 'Test user');
    await user.click(screen.getByText(/save changes/i));

    await waitFor(() => expect(onSubmitMock).toHaveBeenCalled());
  });

  it('should submit form changes when enter key is pressed', async () => {
    const onSubmitMock = jest.fn();
    render(
      <BookDetails book={INITIAL_VALUE} mode='edit' onSubmit={onSubmitMock} />
    );

    const user = userEvent.setup();
    await user.clear(screen.getByLabelText(/title/i));
    await user.type(screen.getByLabelText(/title/i), 'Test user');
    await user.keyboard('{Enter}');

    await waitFor(() => expect(onSubmitMock).toHaveBeenCalled());
  });
});
