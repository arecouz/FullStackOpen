import { Dialog, DialogContent, DialogTitle, Divider } from '@mui/material';
import AddEntryForm from './AddEntryForm';
import { NewEntry } from '../../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntry) => void;
}

const AddPatientModal = ({ modalOpen, onClose, onSubmit }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    {' '}
    <DialogTitle>Add a new patient</DialogTitle>
    <Divider />
    <DialogContent>
      <AddEntryForm onSubmit={onSubmit}/>
    </DialogContent>
  </Dialog>
);

export default AddPatientModal;
