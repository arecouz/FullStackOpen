import axios from 'axios';
import { NewEntry, Patient, PatientFormValues } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getOne = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const createEntry = async (object: NewEntry, patientID: string) => {
  console.log('createEntry api call');
  const { data } = await axios.post<NewEntry>(
    `${apiBaseUrl}/patients/${patientID}/entries`,
    object
  );
  return data;
};

export default {
  getAll,
  getOne,
  create,
  createEntry,
};
