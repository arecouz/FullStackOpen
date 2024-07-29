import { Box, Button, TextField } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { NewEntry } from '../../types';

const OccupationalHealthcareEntryForm = ({
  onSubmit,
}: {
  onSubmit: (values: NewEntry) => void;
}) => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [employerName, setEmployerName] = useState<string>('');

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const newEntry: NewEntry = {
      type: 'OccupationalHealthcare',
      description,
      date,
      specialist,
      employerName,
    };
    onSubmit(newEntry);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Description"
        fullWidth
        value={description}
        onChange={({ target }) => setDescription(target.value)}
        required
      />
      <TextField
        label="Date"
        type="date"
        fullWidth
        value={date}
        onChange={({ target }) => setDate(target.value)}
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        label="Specialist"
        fullWidth
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
        required
      />
      <TextField
        label="Employer Name"
        fullWidth
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default OccupationalHealthcareEntryForm;
