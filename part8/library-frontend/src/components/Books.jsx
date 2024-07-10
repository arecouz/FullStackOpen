import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { ALL_BOOKS, ALL_BOOKS_GENRE } from '../queries';
import { Table } from 'react-bootstrap';
import GenreFilter from './GenreFilter';

const Books = () => {
  const { loading: booksLoading, error: booksError, data: allBooksData } = useQuery(ALL_BOOKS);
  const [selectedGenre, setSelectedGenre] = useState('All books');
  const { loading: booksByGenreLoading, error: booksByGenreError, data: booksByGenreData, refetch } = useQuery(ALL_BOOKS_GENRE, {
    variables: { genre: selectedGenre },
  });

  useEffect(() => {
    refetch();
  }, [selectedGenre, refetch]);

  if (booksLoading || booksByGenreLoading) {
    return <div>loading...</div>;
  }

  if (booksError) {
    return <div>Error: {booksError.message}</div>;
  }

  const books = allBooksData.allBooks;
  let genres = books.map((book) => book.genres).flat();
  genres.push('All books');

  const filteredBooks = selectedGenre === 'All books' ? books : booksByGenreData.allBooks;

  return (
    <div>
      <h2>Books</h2>
      <GenreFilter
        genres={genres}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />

      <Table striped>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Books;
