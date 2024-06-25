import { useState } from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';

const App = () => {

  return (
    <div>
      <div>
        <Link to="/authors">authors</Link>
        <br></br>
        <Link to="/books">books</Link>
        <br></br>
        <Link to="/add_book">add book</Link>
      </div>
      <Routes>
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add_book" element={<NewBook />} />
      </Routes>
    </div>
  );
};

export default App;
