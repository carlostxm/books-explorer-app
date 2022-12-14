import axios from "axios";
import { Book } from "./booksSlice.model";

const apiURL = process.env.REACT_APP_API_URL;

const endpoint = `${apiURL}/subjects/software.json?limit=100&published_in=1984-2022`;

export interface BooksResponse {
  work_count: number;
  works: Array<{
    key: string;
    title: string;
    edition_count: number;
    subject: string[];
    authors: { key: string; name: string }[];
    first_publish_year: number;
  }>;
}

export async function fetchBooks(): Promise<Book[]> {
  try {
    const { data } = await axios.get<BooksResponse>(endpoint);
    return data?.works?.map((work) => ({
      id: work.key,
      authors: work.authors?.map((work) => work.name),
      title: work.title,
      releaseYear: work.first_publish_year,
      subjects: work.subject,
      editionCount: work.edition_count,
    }));
  } catch {
    throw new Error("Error fetching books");
  }
}
