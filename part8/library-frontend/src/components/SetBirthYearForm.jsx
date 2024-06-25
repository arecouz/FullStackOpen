import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_BIRTH_YEAR, ALL_BOOKS, ALL_AUTHORS } from '../queries';

const SetBirthYearForm = ({ authors }) => {
  const [name, setName] = useState('Select an author');
  const [born, setBorn] = useState('');

  const [setBirthYear] = useMutation(EDIT_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error.graphQLErrors);
    },
  });

  const submit = async (event) => {
    event.preventDefault();
    setBirthYear({ variables: { name, setBornTo: Number(born) } });

    setName('');
    setBorn('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {authors.map((author) => (
            <option key={author.name} value={author.name}>
              {author.name}
            </option>
          ))}
        </select>
        <div>
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
            placeholder="Updated Birth Year"
          />
        </div>
        <button type="submit">update</button>
      </form>
    </div>
  );
};

export default SetBirthYearForm;
