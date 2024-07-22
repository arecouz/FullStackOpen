import { v1 as uuid } from 'uuid';
import patientsData from '../../data/patients';
import { NonSensitivePatient, Patient, NewPatient } from '../types';

const getPatients = () => {
  return patientsData;
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

export default { getPatients, getNonSensitivePatients, addPatient };
