import SearchBar from './components/SearchBar';
import { Books } from './components/Books';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function App() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'ghostwhite' }}>
      <SearchBar />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
          px: 8,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Books />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default App;
