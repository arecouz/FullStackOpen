import express from 'express';
import patientsService from '../services/patientsService';
import { toNewEntry, toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  const patient = patientsService.getPatient(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'ERROR';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const patient = patientsService.getPatient(req.params.id);
    if (!patient) {
      console.log('patient not found');
      return res.status(404);
    }
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientsService.addEntry(newEntry, patient);
    console.log('added ENTRTY', addedEntry);
    return res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'ERROR';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
    return res.status(400).send(errorMessage);
  }
});

export default router;
