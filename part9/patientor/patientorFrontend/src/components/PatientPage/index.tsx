import {
  Box,
  Table,
  TableHead,
  Typography,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";
import patientServices from "../../services/patients";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Patient } from "../../types";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      patientServices.getOne(id).then((response) => setPatient(response));
    }
  }, [id]);

  if (!patient) {
    return <></>;
  }

  return (
    <div>
      {" "}
      <Box>
        <Typography align='center' variant='h6'>
          {patient.name}
        </Typography>
      </Box>
      <Table style={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Label</TableCell>
            <TableCell>Details</TableCell>
          </TableRow>
        </TableHead>
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
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>{patient.id}</TableCell>
          </TableRow>
          {/* Add more rows as necessary */}
        </TableBody>
      </Table>
    </div>
  );
};

export default PatientPage;
