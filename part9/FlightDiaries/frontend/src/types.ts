export interface Entry {
  id: number;
  date: string;
  visibility: string;
  weather: string;
  comment: string;
}

export type NewEntry = Omit<Entry, 'id'>;
