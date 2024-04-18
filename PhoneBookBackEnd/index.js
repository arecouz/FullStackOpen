const express = require("express");
const app = express();

app.use(express.json());

let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>testing...</h1>");
});

app.get("/api/persons", (request, response) => {
  response.send(JSON.stringify(phonebook));
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = phonebook.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  phonebook = phonebook.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons/", (request, response) => {
  const NewPerson = request.body;

  if (!NewPerson.name) {
    return response.status(400).json({ error: "name missing" });
  }
  if (!NewPerson.number) {
    return response.status(400).json({ error: "number missing" });
  }
  if (phonebook.some((person) => person.name === NewPerson.name)) {
    return response.status(400).json({ error: "name must be unique" });
  }
  NewPerson.id = Math.floor(Math.random() * 1000000);
  phonebook = phonebook.concat(NewPerson);
  response.json(NewPerson);
});

let currentDate = new Date();
app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for for ${phonebook.length} people</p>
     <p>${currentDate}</p>`
  );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server running on post ${PORT}`);
});
