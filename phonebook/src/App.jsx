import { useEffect, useState } from "react";
import AddNewPersonForm from "./components/AddNewPersonForm";
import SearchPersons from "./components/SearchPersons";
import DisplayPersons from "./components/DisplayPersons";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    personsService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const filteredPersons = () => {
    return persons.filter((person) =>
      person.name.toLowerCase().includes(newSearch)
    );
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = { name: newName, number: newNumber };
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already in the phonebook. Would you like to replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        console.log("updatedPerson", updatedPerson);
        personsService
          .update(existingPerson.id, updatedPerson)
          .then((response) => console.log("response", response.data));
        setPersons(
          persons.map((person) =>
            person.id === existingPerson.id ? updatedPerson : person
          )
        );
        setNewName("");
        setNewNumber("");
      } else {
        setNewName("");
        setNewNumber("");
      }
    } else {
      personsService.create(personObject).then((response) => {
        setPersons(persons.concat(response.data));
      });
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

  const handleDelete = (idToDelete) => {
    const personToDelete = persons.find((person) => person.id === idToDelete);
    if (window.confirm(`Do you want to delete ${personToDelete.name}?`)) {
      personsService.deleteRequest(idToDelete).then((response) => {
        setPersons(persons.filter((person) => person.id !== idToDelete));
      });
    }
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
      <DisplayPersons
        persons={filteredPersons()}
        handleDelete={handleDelete}
      ></DisplayPersons>
    </div>
  );
};

export default App;
