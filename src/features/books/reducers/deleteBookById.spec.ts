import deleteBookById from './deleteBookById';
import { BooksState } from '../booksSlice';
import { Book } from '../booksSlice.model';

const BOOKS: Book[] = [
    {
      authors: ["Bob", "Alice"],
      title: "Software Engineering",
      releaseYear: 1999,
      editionCount: 2,
      subjects: ["Programming"],
      id: "software-engineering-101",
    },
    {
      authors: ["Robert C. Martin"],
      title: "Clean Architecture",
      releaseYear: 2018,
      editionCount: 24,
      subjects: ["Programming", "Architecture"],
      id: "clean-architecture-uncle-bob",
    },
];
  
const initialState: BooksState = {
    value: BOOKS,
    status: 'idle',
}

describe('deleteBookById', () => {
    it('should return same state when book id is not stored', () => {
        const state = deleteBookById(initialState, { payload: 'missing-id', type: '/books/delete-book-by-id' });
        expect(state).toEqual(initialState);
    });

    it('should return a brand new state when the book id is stored', () => {
        const bookToRemove = BOOKS[0].id;
        const state = deleteBookById(initialState, { payload: bookToRemove, type: '/books/delete-book-by-id' });
        expect(state).not.toEqual(initialState);
        expect(state.value.length).toBe(BOOKS.length - 1);
        expect(state.value.find(book => book.id === bookToRemove)).toBeFalsy();
    });
});