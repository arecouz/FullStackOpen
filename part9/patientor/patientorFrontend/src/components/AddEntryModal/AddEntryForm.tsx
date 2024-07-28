import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import HealthCheckEntryForm from './HealthCheckEntryForm';
import HospitalEntryForm from './HospitalEntryForm';
import OccupationalHealthcareEntryForm from './OccupationalHealthcareEntryForm';


const AddEntryForm = () => {
  const [entryType, setEntryType] = useState<string>('');

  const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
    setEntryType(event.target.value as string);
  };

  return (
    <div>
      <form>
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
          <MenuItem value="OccupationalHealthcare">Occupational Healthcare Entry</MenuItem>
          <MenuItem value="HealthCheck">Health Check Entry</MenuItem>
        </Select>

        {entryType === 'Hospital' && <HospitalEntryForm />}
        {entryType === 'OccupationalHealthcare' && <OccupationalHealthcareEntryForm />}
        {entryType === 'HealthCheck' && <HealthCheckEntryForm />}
      </form>
    </div>
  );
};

export default AddEntryForm;
