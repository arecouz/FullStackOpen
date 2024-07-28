import { TextField, Button } from '@mui/material';

const OccupationalHealthcareEntryForm = () => {
  return (
    <div>
      <TextField fullWidth label="Description" />
      <TextField fullWidth label="Date" />
      <TextField fullWidth label="Specialist" />
      <TextField fullWidth label="Employer Name" />
      <Button type="submit" color="primary">
        Submit
      </Button>
    </div>
  );
};

export default OccupationalHealthcareEntryForm;
