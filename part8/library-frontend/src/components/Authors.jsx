import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../queries';
import SetBirthYearForm from './SetBirthYearForm';
import { Table } from 'react-bootstrap';

const Authors = ({ isAuthenticated }) => {
  const result = useQuery(ALL_AUTHORS);

  if (result.loading) {
    return <div> loading... </div>;
  }

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <Table striped>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {isAuthenticated && (
        <>
          <hr></hr>
          <h2>Set Birth Year:</h2>
          <SetBirthYearForm authors={authors} />
        </>
      )}
    </div>
  );
};

export default Authors;
