import { v1 as uuid } from 'uuid';
import patientsData from '../../data/patients';
import {
  NonSensitivePatient,
  Patient,
  NewPatient,
  NewEntry,
  Entry,
} from '../types';

const getPatients = () => {
  return patientsData;
};

const getPatient = (id: string) => {
  const patient = patientsData.find((p) => p.id === id);
  return patient;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patientToAdd: NewPatient): Patient => {
  const newPatient = { id: uuid(), ...patientToAdd };
  patientsData.push(newPatient);
  return newPatient;
};

const addEntry = (entryToAdd: NewEntry, patient: Patient): Entry => {
  const newEntry = { id: uuid(), ...entryToAdd };
  patient.entries.push(newEntry);

  return newEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  addEntry,
  getPatient,
};
