import BooksTable from "./BooksTable";
import { screen, render, prettyDOM } from "@testing-library/react";
import { BookView } from "./booksSlice.model";

const BOOKS: BookView[] = [
  {
    authors: "Bob, Alice",
    title: "Software Engineering",
    releaseYear: 1999,
    editionCount: 2,
    subjects: "Programming",
    id: "software-engineering-101",
  },
  {
    authors: "Robert C. Martin",
    title: "Clean Architecture",
    releaseYear: 2018,
    editionCount: 24,
    subjects: "Programming, Architecture",
    id: "clean-architecture-uncle-bob",
  },
];

const COLUMN_LABELS = [
  "Title",
  "Authors",
  "Release Year",
  "Edition Count",
  "Subjects",
];

describe("BooksTable", () => {
  describe("Without data", () => {
    it("should show a loading spinner when isLoading prop is enabled and there is no data", () => {
      render(<BooksTable isLoading={true} data={[]}/>);
      const loading = screen.getByTestId("loading-spinner");
      expect(loading).toBeDefined();
    });

    it("should show a loading spinner when isLoading prop is enabled and there is data", () => {
      render(<BooksTable isLoading={true} data={BOOKS} />);
      const loading = screen.getByTestId("loading-spinner");
      expect(loading).toBeDefined();
    });

    it("should show a No Data message when there is no data to show", () => {
      render(<BooksTable isLoading={false} data={[]} />);
      const loading = screen.queryByTestId("loading-spinner");
      expect(loading).toBeNull();
      const noDataMessage = screen.getByText(/no records found/i);
      expect(noDataMessage).toBeDefined();
    });
  });

  describe("With data", () => {
    it("should show data passed through data property", () => {
      render(<BooksTable isLoading={false} data={BOOKS} />);
      COLUMN_LABELS.forEach((column) => {
        const columnElement = screen.getByText(column);
        expect(columnElement).toBeDefined();
      });
      BOOKS.forEach((row) => {
        const authors = screen.getByText(row.authors);
        expect(authors).toBeDefined();
      });
    });
  });
});
