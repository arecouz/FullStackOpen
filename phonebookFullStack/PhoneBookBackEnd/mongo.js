const mongoose = require("mongoose");
console.log("mongoose operation...");

async function main() {
  if (process.argv.length < 3) {
    console.log(
      "use this format: node mongo.js <password> opt<newName newNumber>"
    );
    process.exit(1);
  }
  const password = process.argv[2];

  mongoose.set("strictQuery", false);
  await mongoose.connect(url);

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  });

  const Person = mongoose.model("Person", personSchema);

  if (process.argv.length == 3) {
    try {
      const result = await Person.find({});
      result.forEach((person) => {
        console.log(person);
      });
    } catch (error) {
      console.error("an error: ", error);
    } finally {
      mongoose.connection.close();
      process.exit(1);
    }
  }

  const newName = process.argv[3];
  const newNumber = process.argv[4];
  const person = new Person({
    name: newName,
    number: newNumber,
  });

  try {
    const r = await person.save();
    console.log("person saved: ", r);
  } catch (error) {
    console.error("an error occurred while saving: ", error);
  } finally {
    mongoose.connection.close();
  }
}

main();
