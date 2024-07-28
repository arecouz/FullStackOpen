import express from 'express';
import patientsService from '../services/patientsService';
import { toNewEntry, toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  console.log(req.params.id);
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
  console.log('/:id/entries');
  try {
    const patient = patientsService.getPatient(req.params.id);
    if (!patient) {
      return res.status(404);
    }
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientsService.addEntry(newEntry, patient);
    return res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'ERROR';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    return res.status(400).send(errorMessage);
  }
});

export default router;
