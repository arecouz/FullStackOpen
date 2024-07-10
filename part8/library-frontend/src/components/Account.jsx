import { useQuery } from '@apollo/client';
import { ME, ALL_BOOKS_GENRE } from '../queries';

const Account = () => {
  const me = useQuery(ME);
  const favoriteGenre = me.data?.me?.favoriteGenre;

  const {
    data: recommendationsData,
    loading: recommendationsLoading,
    error: recommendationsError,
  } = useQuery(ALL_BOOKS_GENRE, {
    variables: { genre: favoriteGenre },
    skip: !favoriteGenre,
  });

  if (me.loading || recommendationsLoading) return <div className="text-center">loading...</div>;
  if (me.error) return <div className="text-center text-danger">Error loading user data</div>;
  if (recommendationsError) return <div className="text-center text-danger">Error loading recommendations</div>;

  return (
    <div className="container mt-4">
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">Account Information</h2>
          <p><strong>User:</strong> {me.data.me.username}</p>
          <p><strong>Your favorite genre:</strong> {me.data.me.favoriteGenre}</p>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Recommendations: {me.data.me.favoriteGenre}</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
              </tr>
            </thead>
            <tbody>
              {recommendationsData?.allBooks.map((book) => (
                <tr key={book.title}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Account;
