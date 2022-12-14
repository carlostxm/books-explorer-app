import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { BookView } from './booksSlice.model';
import { Typography } from '@mui/material';
import Loading from '../../components/Loading';

interface BooksTableProps {
  data: BookView[];
  isLoading: boolean;
  onDelete?: (id: string) => void;
}

function BooksTable({ data, isLoading, onDelete }: BooksTableProps) {
  const handleDeleteRow = (id: string) => {
    if (onDelete) onDelete(id);
  };

  const isEmpty = !data?.length;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align='right'>Authors</TableCell>
            <TableCell align='right'>Release Year</TableCell>
            <TableCell align='right'>Edition Count</TableCell>
            <TableCell align='right'>Subjects</TableCell>
            <TableCell align='right'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={5}>
                <Loading />
              </TableCell>
            </TableRow>
          )}
          {!isLoading && isEmpty && (
            <TableRow>
              <TableCell colSpan={5}>
                <Typography>No records found</Typography>
              </TableCell>
            </TableRow>
          )}
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {row.title}
              </TableCell>
              <TableCell align='right'>{row.authors}</TableCell>
              <TableCell align='right'>{row.releaseYear}</TableCell>
              <TableCell align='right'>{row.editionCount}</TableCell>
              <TableCell align='right'>{row.subjects}</TableCell>
              <TableCell align='right'>
                <IconButton
                  aria-label='upload picture'
                  component='label'
                  onClick={(event) => {
                    event.preventDefault();
                    handleDeleteRow(row.id);
                  }}
                >
                  <input hidden accept='image/*' type='file' />
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BooksTable;
