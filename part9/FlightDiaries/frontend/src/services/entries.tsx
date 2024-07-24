import axios from 'axios';
import { Entry, NewEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllEntries = async () => {
  const response = await axios.get<Entry[]>(baseUrl);
  return response.data;
};

export const postEntry = async (newEntry: NewEntry) => {
  const response = await axios.post<NewEntry>(baseUrl, newEntry);
  console.log(response.data)
  return response.data;
};
