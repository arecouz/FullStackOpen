import { Table, TableBody, TableRow, TableCell } from '@mui/material';
import { HealthCheckEntry, HealthCheckRating } from '../../../types';

const HealthCheckEntryRender = ({ entry }: { entry: HealthCheckEntry }) => {
  const getRating = (rating: HealthCheckRating): string => {
    switch (rating) {
      case HealthCheckRating.Healthy:
        return 'Healthy';
      case HealthCheckRating.LowRisk:
        return 'Low Risk';
      case HealthCheckRating.HighRisk:
        return 'High Risk';
      case HealthCheckRating.CriticalRisk:
        return 'Critical Risk';
      default:
        return 'Unknown';
    }
  };

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>Specialist</TableCell>
          <TableCell>{entry.specialist}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Health Check Rating</TableCell>
          <TableCell>{getRating(entry.healthCheckRating)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default HealthCheckEntryRender;
