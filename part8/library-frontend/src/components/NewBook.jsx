import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS, ALL_BOOKS_GENRE } from '../queries';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NewBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const nav = useNavigate();

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }, {query: ALL_BOOKS_GENRE}],
    onError: (error) => {
      console.log(error.graphQLErrors[0]);
    },
  });

  const submit = async (event) => {
    event.preventDefault();
    const x = await addBook({
      variables: { title, author, published: Number(published), genres },
    });
    nav('/books');

    setTitle('');
    setPublished('');
    setAuthor('');
    setGenres([]);
    setGenre('');
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <Container>
      <h2>Add a New Book</h2>
      <Form onSubmit={submit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPublished">
          <Form.Label>Published</Form.Label>
          <Form.Control
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formGenre">
          <Form.Label>Genre</Form.Label>
          <Form.Control
            type="text"
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <Button onClick={addGenre} type="button" className="mt-2">
            Add Genre
          </Button>
        </Form.Group>

        <Form.Group>
          <Form.Label>Genres</Form.Label>
          <div>{genres.join(' ')}</div>
        </Form.Group>

        <Button type="submit" className="mt-3">
          Create Book
        </Button>
      </Form>
    </Container>
  );
};

export default NewBook;
