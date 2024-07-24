import { useState, useEffect } from 'react';
import { Entry } from './types';
import DiaryEntries from './components/DiaryEntries';
import NewDiaryEntry from './components/NewDiaryEntry';
import { getAllEntries } from './services/entries';

const App = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    getAllEntries().then((response) => setEntries(response));
  }, [entries]);
  return (
    <div className="container p-4">
      <NewDiaryEntry />
      <DiaryEntries entries={entries.reverse()} />
    </div>
  );
};

export default App;
