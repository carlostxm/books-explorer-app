import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useBooks from '../hooks/useBooks';
import { useState } from 'react';
import Search from './Search';

function SearchBar() {

  const [query, setQuery] = useState<string>('');

  const { searchBooks } = useBooks();

  function handleSearchChange(value: string) {
    setQuery(value);
  }

  React.useEffect(() => {
    searchBooks(query);
  }, [query, searchBooks]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Software Books Explorer
          </Typography>
          <Search onChange={handleSearchChange} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default SearchBar;