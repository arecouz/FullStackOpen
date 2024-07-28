
import { TextField, Button } from '@mui/material';

const HealthCheckEntryForm = () => {
  return (
    <div>
      <TextField fullWidth label="Description" />
      <TextField fullWidth label="Date" />
      <TextField fullWidth label="Specialist" />
      <TextField fullWidth label="Health Check Rating" />
      <Button type="submit" color="primary">Submit</Button>
    </div>
  );
};

export default HealthCheckEntryForm;
