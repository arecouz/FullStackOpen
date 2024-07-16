import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';
import Account from './components/Account';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useApolloClient } from '@apollo/client';
import { useMutation, useQuery, useSubscription } from '@apollo/client';

import { ALL_BOOKS, BOOK_ADDED } from './queries';

const App = () => {
  const client = useApolloClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const newBook = data.data.bookAdded;
      window.alert(`New Book Added: ${newBook.title}`);

      const currentBooksData = client.readQuery({ query: ALL_BOOKS });
      client.cache.updateQuery({ query: ALL_BOOKS }, (existingBooks) => {
        return {
          allBooks: [...existingBooks.allBooks, newBook],
        };
      });
    },
  });

  const handleLogout = () => {
    setIsAuthenticated(null);
    localStorage.clear();
    client.resetStore();
  };


  return (
    <div className="container">
      <Navbar bg="light" expand="lg">
        <Container>
          {isAuthenticated ? (
            <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button variant="outline-primary" as={Link} to="/login">
              Login
            </Button>
          )}
          <Navbar.Brand href="/">Library</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/account">
                Account
              </Nav.Link>
              <Nav.Link as={Link} to="/authors">
                Authors
              </Nav.Link>
              <Nav.Link as={Link} to="/books">
                Books
              </Nav.Link>
              <Nav.Link as={Link} to="/add_book">
                Add Book
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/account"
          element={isAuthenticated ? <Account /> : <Navigate to="/login" />}
        />
        <Route
          path="/authors"
          element={<Authors isAuthenticated={isAuthenticated} />}
        />
        <Route path="/books" element={<Books />} />
        <Route
          path="/add_book"
          element={isAuthenticated ? <NewBook /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={
            <Login
              setAuthorization={setIsAuthenticated}
              isAuthorized={isAuthenticated}
            />
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
