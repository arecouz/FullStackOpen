import {
  Card,
  CardHeader,
  Box,
  Typography,
  CardContent,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

import { useEffect, useState } from 'react';
import { Diagnosis, Entry } from '../../types';
import diagnosisServices from '../../services/diagnosis';
import HealthCheckEntryRender from './Entry/HealthCheckEntry';
import HospitalEntryRender from './Entry/HospitalEntry';
import OccupationalHealthcareEntryRender from './Entry/OccupationalHealthcareEntry';

const EntryInfo = ({ entry }: { entry: Entry }) => {
  const [diagnosisList, setDiagnosisList] = useState<Diagnosis[]>([]);

  useEffect(() => {
    diagnosisServices.getAll().then((response) => setDiagnosisList(response));
  }, []);

  const getDiagnosisDescription = (code: string): string | undefined => {
    const diagnosis = diagnosisList.find((d) => d.code === code);
    return diagnosis ? diagnosis.name : undefined;
  };

  const RenderIcon = () => {
    switch (entry.type) {
      case 'Hospital':
        return <LocalHospitalRoundedIcon />;
      case 'OccupationalHealthcare':
        return <WorkRoundedIcon />;
      case 'HealthCheck':
        return <FavoriteRoundedIcon />;
    }
  };

  const Render = () => {
    switch (entry.type) {
      case 'Hospital':
        return <HospitalEntryRender entry={entry} />;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcareEntryRender entry={entry} />;
      case 'HealthCheck':
        return <HealthCheckEntryRender entry={entry} />;
      default:
        return <>something went wrong</>;
    }
  };

  return (
    <>
      <>
        {' '}
        <Card key={entry.id} style={{ marginBottom: '1em' }}>
          <CardHeader
            title={
              <Box display="flex" alignItems="center" justifyContent="center">
                <RenderIcon />
                <Typography
                  variant="h6"
                  component="span"
                  style={{ marginLeft: '0.5em' }}
                >
                  {entry.date}
                </Typography>
              </Box>
            }
          />
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
                  {Object.values(entry.diagnosisCodes).map((code: string) => (
                    <TableRow key={code}>
                      <TableCell align="center">
                        {getDiagnosisDescription(code)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            <Render />
          </CardContent>
        </Card>
      </>
    </>
  );
};

export default EntryInfo;
