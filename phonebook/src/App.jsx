import { useState } from "react";
import AddNewPersonForm from "./components/AddNewPersonForm";
import SearchPersons from "./components/SearchPersons";
import DisplayPersons from "./components/DisplayPersons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "01234" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  const filteredPersons = () => {
    return persons.filter((person) =>
      person.name.toLowerCase().includes(newSearch)
    );
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = { name: newName, number: newNumber };
    {
      /* Check for duplicate names before saving to persons */
    }
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already in phonebook`);
      setNewName("");
      setNewNumber("");
    } else {
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
  };

  return (
    <div>
      <AddNewPersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      ></AddNewPersonForm>
      <hr />
      <SearchPersons
        newSearch={newSearch}
        handleSearchChange={handleSearchChange}
      ></SearchPersons>
      <DisplayPersons persons={filteredPersons()}></DisplayPersons>
    </div>
  );
};

export default App;
