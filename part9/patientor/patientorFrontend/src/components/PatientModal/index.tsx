import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Patient } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  patient: Patient;
}

const PatientModal = ({ modalOpen, onClose, patient }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>{patient.name}</DialogTitle>
    <Divider />
    <DialogContent>
      <Table style={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>ssn</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={patient.id}>
            <TableCell>{patient.name}</TableCell>
            <TableCell>{patient.gender}</TableCell>
            <TableCell>{patient.occupation}</TableCell>
            <TableCell>{patient.ssn}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </DialogContent>
  </Dialog>
);

export default PatientModal;
