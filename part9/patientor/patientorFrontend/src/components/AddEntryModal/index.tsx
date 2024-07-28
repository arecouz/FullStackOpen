import { Dialog, DialogContent, DialogTitle, Divider } from '@mui/material';
import AddEntryForm from './AddEntryForm';


interface Props {
  modalOpen: boolean;
  onClose: () => void;
}

const AddPatientModal = ({ modalOpen, onClose }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    {' '}
    <DialogTitle>Add a new patient</DialogTitle>
    <Divider />
    <DialogContent>
      <AddEntryForm />
    </DialogContent>
  </Dialog>
);

export default AddPatientModal;
