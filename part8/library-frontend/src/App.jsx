import { useState } from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import {Navbar, Container, Nav} from 'react-bootstrap'


const App = () => {
  return (
    <div className='container'>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Library</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/authors">Authors</Nav.Link>
              <Nav.Link as={Link} to="/books">Books</Nav.Link>
              <Nav.Link as={Link} to="/add_book">Add Book</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add_book" element={<NewBook />} />
      </Routes>
    </div>
  );
};

export default App;
