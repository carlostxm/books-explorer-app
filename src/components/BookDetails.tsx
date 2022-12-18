import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { BookView } from '../slices/books/booksSlice.model';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { useRef } from 'react';

export type BookDetailsMode = 'view' | 'edit' | 'create';

export interface BookDetailsProps {
  book: BookView;
  mode?: BookDetailsMode;
  onSubmit?: (book: BookView) => void;
}

const CREATE_BOOK_INITIAL_VALUE: BookView = {
  id: 'Insert ID',
  title: 'New title',
  authors: ['New author'],
  releaseYear: new Date().getFullYear(),
  editionCount: 0,
  subjects: ['New subject'],
};

function BookDetails({ book, onSubmit, mode }: BookDetailsProps) {
  const initialValue = useRef(book ?? CREATE_BOOK_INITIAL_VALUE);

  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      ...initialValue.current,
    },
    onSubmit: (values: BookView) => {
      if (onSubmit) onSubmit(values);
    },
  });

  const shouldShowSubmitButton = mode === 'edit' || mode === 'create';
  const couldBeEditableProps: TextFieldProps['InputProps'] = {
    readOnly: !shouldShowSubmitButton,
  };

  const { authors, subjects } = initialValue.current;

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
          placeholder='Insert title'
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
        {shouldShowSubmitButton && (
          <Button color='primary' variant='contained' fullWidth type='submit'>
            Save changes
          </Button>
        )}
      </Stack>
    </form>
  );
}

export default BookDetails;
