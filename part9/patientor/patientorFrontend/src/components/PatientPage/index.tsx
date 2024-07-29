import {
  Box,
  Table,
  Typography,
  TableCell,
  TableRow,
  TableBody,
  Card,
  Button,
} from '@mui/material';

import patientServices from '../../services/patients';
import AddEntryModal from '../AddEntryModal';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import EntryInfo from './EntryInfo';
import { Patient, Entry, NewEntry } from '../../types';

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [entryModal, setEntryModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) {
      setError('Patient ID is missing');
      return;
    }

    patientServices
      .getOne(id)
      .then((response) => setPatient(response))
      .catch(() => setError('Failed to fetch patient'));
  }, [id, patient]);

  const openEntryModal = (): void => setEntryModalOpen(true);

  const closeEntryModal = (): void => {
    setEntryModalOpen(false);
  };

  const submitNewEntry = async (values: NewEntry) => {
    console.log('submitNewEntry', values);
    if (!id) {
      setError('Patient ID is missing');
      setEntryModalOpen(false);
      return;
    }
    try {
      const newEntry = await patientServices.createEntry(values, id);
      console.log(newEntry);
      setEntryModalOpen(false);
    } catch (e: unknown) {
      setEntryModalOpen(false);
      console.log(e);
    }
  };

  if (error) {
    return (
      <Box padding="8px">
        <Typography color="error" align="center" variant="h5">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!patient) {
    return (
      <Box padding="8px">
        <Typography align="center" variant="h5">
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <div>
      <Card style={{ margin: '1em', backgroundColor: '#f5f5f5' }}>
        <Box>
          <Typography align="center" variant="h3">
            {patient.name}
          </Typography>
        </Box>
        <Table style={{ marginBottom: '1em' }}>
          <TableBody>
            <TableRow>
              <TableCell>Date of Birth</TableCell>
              <TableCell>{patient.dateOfBirth}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>SSN</TableCell>
              <TableCell>{patient.ssn}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gender</TableCell>
              <TableCell>{patient.gender}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Occupation</TableCell>
              <TableCell>{patient.occupation}</TableCell>
            </TableRow>
            {/* Add more rows as necessary */}
          </TableBody>
        </Table>
      </Card>
      <>
        <Box padding="8px">
          <Typography align="center" variant="h4">
            <Button variant="outlined" onClick={() => openEntryModal()}>
              add entry
            </Button>
          </Typography>
          <AddEntryModal
            modalOpen={entryModal}
            onClose={closeEntryModal}
            onSubmit={submitNewEntry}
          />
          <br></br>
        </Box>
        {Object.values(patient.entries).map((entry: Entry) => (
          <EntryInfo entry={entry} key={entry.id} />
        ))}
      </>
    </div>
  );
};

export default PatientPage;
