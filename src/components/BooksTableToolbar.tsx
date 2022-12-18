import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

interface BooksTableToolbarProps {
  onCreate: () => void;
  disableActions: boolean;
}

function BooksTableToolbar({
  disableActions,
  onCreate,
  children,
}: React.PropsWithChildren<BooksTableToolbarProps>) {
  return (
    <Card>
      <CardHeader
        title={
          <Typography variant='h6' gutterBottom={true}>
            Book Collection
          </Typography>
        }
        action={
          <Button
            variant='outlined'
            onClick={onCreate}
            disabled={disableActions}
          >
            Create
          </Button>
        }
      />
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default BooksTableToolbar;
