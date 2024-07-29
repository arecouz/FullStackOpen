import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import HealthCheckEntryForm from './HealthCheckEntryForm';
import HospitalEntryForm from './HospitalEntryForm';
import OccupationalHealthcareEntryForm from './OccupationalHealthcareEntryForm';
import { NewEntry } from '../../types';
import { useState } from 'react';

const AddEntryForm = ({
  onSubmit,
}: {
  onSubmit: (values: NewEntry) => void;
}) => {
  const [entryType, setEntryType] = useState<string>('');

  const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
    setEntryType(event.target.value as string);
  };



  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <Select
          fullWidth
          value={entryType}
          onChange={onEntryTypeChange}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select entry type
          </MenuItem>
          <MenuItem value="Hospital">Hospital Entry</MenuItem>
          <MenuItem value="OccupationalHealthcare">
            Occupational Healthcare Entry
          </MenuItem>
          <MenuItem value="HealthCheck">Health Check Entry</MenuItem>
        </Select>

        {entryType === 'Hospital' && <HospitalEntryForm onSubmit={onSubmit} />}
        {entryType === 'OccupationalHealthcare' && (
          <OccupationalHealthcareEntryForm onSubmit={onSubmit} />
        )}
        {entryType === 'HealthCheck' && (
          <HealthCheckEntryForm onSubmit={onSubmit} />
        )}
      </Box>
    </div>
  );
};

export default AddEntryForm;
