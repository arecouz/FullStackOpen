import { Table, TableBody, TableRow, TableCell } from '@mui/material';
import { OccupationalHealthcareEntry } from '../../../types';

const OccupationalHealthcareEntryRender = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => (
  <Table>
    <TableBody>
      <TableRow>
        <TableCell>Specialist</TableCell>
        <TableCell>{entry.specialist}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Employer</TableCell>
        <TableCell>{entry.employerName}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

export default OccupationalHealthcareEntryRender;
