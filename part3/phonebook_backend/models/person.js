require('dotenv').config();
const mongoose = require('mongoose');

// if (process.argv.length < 2 || process.argv.length > 4) {
// 	console.error(`error: expected 3 - 5 args, you gave ${process.argv.length} :(`);
// 	process.exit(1);
// }

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false);

mongoose.connect(url).then(result => {
	console.log("connected to MongoDB");
  })
  .catch(error => {
	console.error("Failed to connect to MongoDB", error.message);
  });

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
});

module.exports = mongoose.model('Person', personSchema);

// if (process.argv.length === 4) {
// 	const person = new Person({
// 		name: process.argv[2],
// 		number: process.argv[3],
// 	});
	
// 	person.save().then(result => {
// 		console.log(`added ${person.name} ${person.number} to phonebook`)
// 		mongoose.connection.close();
// 	})
// } else {
// 	Person.find({}).then(persons => {
// 		console.log("phonebook:")
// 		persons.forEach(person => {
// 			console.log(`${person.name} ${person.number}`)
// 		})
// 		mongoose.connection.close();
// 	})
// }