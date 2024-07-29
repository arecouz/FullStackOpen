import { Table, TableBody, TableRow, TableCell } from '@mui/material';
import { HospitalEntry } from '../../../types';

const HospitalEntryRender = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <>
      {' '}
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Specialist</TableCell>
            <TableCell>{entry.specialist}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>discharge ({entry.discharge.date})</TableCell>
            <TableCell>{entry.discharge.criteria}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default HospitalEntryRender;
