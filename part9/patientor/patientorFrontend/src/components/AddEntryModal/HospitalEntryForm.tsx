import { Box, Button, TextField } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { NewEntry } from '../../types';

const HospitalEntryForm = ({
  onSubmit,
}: {
  onSubmit: (values: NewEntry) => void;
}) => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [dischargeCriteria, setDischargeCriteria] = useState<string>('');

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const newEntry: NewEntry = {
      type: 'Hospital',
      description,
      date,
      specialist,
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
      },
    };
    console.log('newEntry', newEntry);
    onSubmit(newEntry);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
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
        label="Discharge Date"
        type="date"
        fullWidth
        value={dischargeDate}
        onChange={({ target }) => setDischargeDate(target.value)}
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        label="Discharge Criteria"
        fullWidth
        value={dischargeCriteria}
        onChange={({ target }) => setDischargeCriteria(target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </Box>
  );
};

export default HospitalEntryForm;
