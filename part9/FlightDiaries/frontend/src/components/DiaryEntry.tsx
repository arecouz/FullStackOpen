import { Entry } from '../types';

const DiaryEntry = ({ entry }: { entry: Entry }) => {
  return (
    <>
    <hr/>
      <h3>{entry.date}</h3>
      <div>visibility: {entry.visibility}</div>
      <div>weather: {entry.weather}</div>
    </>
  );
};

export default DiaryEntry;
