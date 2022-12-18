import Box from '@mui/material/Box';
import MuiModal from '@mui/material/Modal';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactElement;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  maxHeight: '60vh',
  overflowY: 'auto',
};

function Modal({ open, children, onClose }: ModalProps) {
  return (
    <MuiModal
      open={open}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>{children}</Box>
    </MuiModal>
  );
}

export default Modal;
