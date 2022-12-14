import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';

const StyledMenuItem = styled(MenuItem)<{ color?: string }>(({ color }) => ({
  color: color,
}));

const ITEM_HEIGHT = 48;

interface BookTableActionsProps {
  actions: {
    label: string;
    onClick: () => void;
    color?: string;
  }[];
}

function BookTableActions({ actions }: BookTableActionsProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleActionClick = (callback: () => void) => () => {
    setAnchorEl(null);
    callback();
  };

  return (
    <div>
      <IconButton
        aria-label='more'
        id='long-button'
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id='long-menu'
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {actions.map(({ label, onClick, color }, index) => (
          <StyledMenuItem
            key={label}
            onClick={handleActionClick(onClick)}
            color={color}
          >
            {label}
          </StyledMenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default BookTableActions;
