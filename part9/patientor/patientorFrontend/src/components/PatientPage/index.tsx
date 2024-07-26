import {
  Box,
  Table,
  Typography,
  TableCell,
  TableRow,
  TableBody,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import patientServices from '../../services/patients';
import diagnosisServices from '../../services/diagnosis';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Diagnosis, Entry, Patient } from '../../types';

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnosisList, setDiagnosisList] = useState<Diagnosis[]>([]);

  const { id } = useParams();

  useEffect(() => {
    diagnosisServices.getAll().then((response) => setDiagnosisList(response));
  }, []);

  useEffect(() => {
    if (id) {
      patientServices.getOne(id).then((response) => setPatient(response));
    }
  }, [id]);

  if (!patient) {
    return <></>;
  }

  const getDiagnosisDescription = (code: string): string | undefined => {
    const diagnosis = diagnosisList.find((d) => d.code === code);
    return diagnosis ? diagnosis.name : undefined;
  };

  return (
    <div>
      <Box>
        <Typography align="center" variant="h6">
          {patient.name}
        </Typography>
      </Box>
      <Table style={{ marginBottom: '1em' }}>
        <TableBody>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>{patient.name}</TableCell>
          </TableRow>
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
      <br />
      {patient.entries.length !== 0 && (
        <>
          {Object.values(patient.entries).map((entry: Entry) => (
            <Card key={entry.id} style={{ marginBottom: '1em' }}>
              <CardHeader title={`${entry.date}`} align="center" />
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>{entry.description}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                {entry.diagnosisCodes && (
                  <Table>
                    <TableBody>
                      {Object.values(entry.diagnosisCodes).map(
                        (code: string) => (
                          <TableRow key={code}>
                            <TableCell>{code}</TableCell>
                            <TableCell align="center">
                              {getDiagnosisDescription(code)}
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};

export default PatientPage;
