import {
  Card,
  CardHeader,
  Box,
  Typography,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
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

  const getDiagnosisDescription = (code: string): string => {
    const diagnosis = diagnosisList.find((d) => d.code === code);
    return diagnosis ? diagnosis.name : 'Unknown Diagnosis';
  };

  const RenderIcon = () => {
    switch (entry.type) {
      case 'Hospital':
        return <LocalHospitalRoundedIcon />;
      case 'OccupationalHealthcare':
        return <WorkRoundedIcon />;
      case 'HealthCheck':
        return <FavoriteRoundedIcon />;
      default:
        return null;
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
        return <Typography variant="body1">Invalid entry type</Typography>;
    }
  };

  return (
    <Card key={entry.id} style={{ marginBottom: '1em' }}>
      <CardHeader
        title={
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box display="flex" alignItems="center" mb={1}>
              <RenderIcon />
              <Typography
                variant="h4"
                component="span"
                style={{ marginLeft: '0.5em' }}
              >
                {entry.date}
              </Typography>
            </Box>
            <Typography
              variant="h5"
              component="span"
              style={{ marginLeft: '0.5em', fontStyle: 'italic' }}
            >
              {entry.description}
            </Typography>
          </Box>
        }
      />
      <CardContent>
        {entry.diagnosisCodes && (
          <List>
            <Typography
              variant="h6"
              component="span"
              style={{ marginLeft: '0.5em', fontStyle: 'italic' }}
            >
              Diagnosis:
            </Typography>
            {entry.diagnosisCodes.map((code) => (
              <ListItem key={code}>
                <ListItemText primary={getDiagnosisDescription(code)} />
              </ListItem>
            ))}
          </List>
        )}
        <Divider style={{ margin: '10px 0' }} />
        <Render />
      </CardContent>
    </Card>
  );
};

export default EntryInfo;
