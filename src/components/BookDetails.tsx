import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { BookView } from '../slices/books/booksSlice.model';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';

interface BookDetailsProps {
  book: BookView;
  mode?: 'view' | 'edit';
  onSubmit?: (book: BookView) => void;
}

function BookDetails({ book, onSubmit, mode }: BookDetailsProps) {
  function handleSubmit() {}

  const { authors, title, editionCount, releaseYear, subjects } = book;
  const isEditionDisabled = mode !== 'edit';
  const inputProps: TextFieldProps['InputProps'] = {
    readOnly: isEditionDisabled,
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          InputProps={inputProps}
          id='detailed-book-title'
          label='Title'
          defaultValue={title}
        />
        <Box sx={{ display: 'inline-flex', gap: '8px' }}>
          <TextField
            InputProps={inputProps}
            id='detailed-book-year'
            label='Release Year'
            defaultValue={releaseYear}
          />
          <TextField
            InputProps={inputProps}
            id='detailed-book-edition-count'
            label='# Editions'
            defaultValue={editionCount}
          />
        </Box>
        <FormControl>
          <FormLabel component='legend'>Authors</FormLabel>
          <FormGroup>
            <Stack spacing={2}>
              {authors.map((author, index) => {
                const key = `detailed-book-author-${index}`;
                return (
                  <TextField
                    key={key}
                    id={key}
                    InputProps={inputProps}
                    defaultValue={author}
                  />
                );
              })}
            </Stack>
          </FormGroup>
        </FormControl>
        <FormControl>
          <FormLabel component='legend'>Subjects</FormLabel>
          <FormGroup>
            <Stack spacing={2}>
              {subjects.map((subject, index) => {
                const key = `detailed-book-author-${index}`;
                return (
                  <TextField
                    key={key}
                    id={key}
                    InputProps={inputProps}
                    defaultValue={subject}
                  />
                );
              })}
            </Stack>
          </FormGroup>
        </FormControl>
      </Stack>
    </form>
  );
}

export default BookDetails;
