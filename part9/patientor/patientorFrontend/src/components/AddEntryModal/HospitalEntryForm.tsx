import { TextField, Button } from '@mui/material';

const HospitalEntryForm = () => {
  return (
    <div>
      <TextField fullWidth label="Description" />
      <TextField fullWidth label="Date" />
      <TextField fullWidth label="Specialist" />
      <TextField fullWidth label="Discharge Date" />
      <TextField fullWidth label="Discharge Criteria" />
      <Button type="submit" color="primary">Submit</Button>
    </div>
  );
};

export default HospitalEntryForm;
