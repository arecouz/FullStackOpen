import { Entry } from '../types';
import DiaryEntry from './DiaryEntry';

const DiaryEntries = ({ entries }: { entries: Entry[] }) => {
  return (
    <>
      <h1>Diary Entries:</h1>
      <div>
        {entries.map((entry) => (
          <DiaryEntry entry={entry} key={entry.date} />
        ))}
      </div>
    </>
  );
};

export default DiaryEntries;
