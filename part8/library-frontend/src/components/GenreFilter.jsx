import { useState } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';

const GenreFilter = ({ genres, selectedGenre, setSelectedGenre }) => {
 
  const handleSelect = (eventKey) => {
    setSelectedGenre(eventKey);
  };

  return (
    <>
      <DropdownButton
        id="dropdown-basic-button"
        title={selectedGenre}
        onSelect={handleSelect}
      >
        {genres.map((genre, index) => (
          <Dropdown.Item key={index} eventKey={genre}>{genre}</Dropdown.Item>
        ))}
      </DropdownButton>
    </>
  );
};

export default GenreFilter;
