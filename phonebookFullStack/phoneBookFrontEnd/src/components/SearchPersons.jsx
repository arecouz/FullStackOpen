const SearchPersons = ({newSearch, handleSearchChange}) => {
  return (
    <>
      search: <input value={newSearch} onChange={handleSearchChange}></input>
    </>
  );
};

export default SearchPersons