import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { BookView } from '../slices/books/booksSlice.model';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';

export type BookDetailsMode = 'view' | 'edit';

export interface BookDetailsProps {
  book: BookView;
  mode?: BookDetailsMode;
  onSubmit?: (book: BookView) => void;
}

function BookDetails({ book, onSubmit, mode }: BookDetailsProps) {
  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      ...book,
    },
    onSubmit: (values: BookView) => {
      if (onSubmit) onSubmit(values);
    },
  });

  const isEditMode = mode === 'edit';
  const couldBeEditableProps: TextFieldProps['InputProps'] = {
    readOnly: !isEditMode,
  };

  const { authors, subjects } = book;

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          InputProps={couldBeEditableProps}
          id='title'
          name='title'
          label='Title'
          value={values.title}
          onChange={handleChange}
        />
        <Box sx={{ display: 'inline-flex', gap: '8px' }}>
          <TextField
            InputProps={couldBeEditableProps}
            id='releaseYear'
            name='releaseYear'
            label='Release Year'
            type='number'
            value={values.releaseYear}
            onChange={handleChange}
          />
          <TextField
            InputProps={couldBeEditableProps}
            id='editionCount'
            name='editionCount'
            label='# Editions'
            type='number'
            value={values.editionCount}
            onChange={handleChange}
          />
        </Box>
        <FormLabel component='legend'>Authors</FormLabel>
        <FormGroup>
          <Stack spacing={2}>
            {authors.map((author, index) => {
              return (
                <TextField
                  key={`detailed-book-author-${index}`}
                  id={`authors[${index}]`}
                  name={`authors[${index}]`}
                  InputProps={couldBeEditableProps}
                  value={values.authors[index]}
                  onChange={handleChange}
                />
              );
            })}
          </Stack>
        </FormGroup>
        <FormLabel component='legend'>Subjects</FormLabel>
        <FormGroup>
          <Stack spacing={2}>
            {subjects.map((subject, index) => {
              const key = `detailed-book-author-${index}`;
              return (
                <TextField
                  key={key}
                  id={`subjects[${index}]`}
                  name={`subjects[${index}]`}
                  InputProps={couldBeEditableProps}
                  value={values.subjects[index]}
                  onChange={handleChange}
                />
              );
            })}
          </Stack>
        </FormGroup>
        {isEditMode && (
          <Button color='primary' variant='contained' fullWidth type='submit'>
            Save changes
          </Button>
        )}
      </Stack>
    </form>
  );
}

export default BookDetails;
