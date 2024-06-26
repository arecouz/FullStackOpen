const DisplayPersons = ({ persons, handleDelete }) => {
  console.log(persons)
  return (
    <div>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name}: {person.number}{" "}
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default DisplayPersons;
