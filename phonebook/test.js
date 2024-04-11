const persons = [{name: "one"}, {name: "two"}, {name: "three"}]


console.log(persons.filter((person) => person.name.toLowerCase().includes("on")))