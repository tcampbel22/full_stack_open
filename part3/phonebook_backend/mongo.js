const mongoose = require('mongoose');

if (process.argv.length < 3 || process.argv.length > 5) {
	console.error(`error: expected 3 - 5 args, you gave ${process.argv.length} :(`);
	process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://tcampbel22:${password}@cluster0.gomqvlh.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 5) {
	const person = new Person({
		name: process.argv[3],
		number: process.argv[4],
	});
	
	person.save().then(result => {
		console.log(`added ${person.name} ${person.number} to phonebook`)
		mongoose.connection.close();
	})
} else {
	Person.find({}).then(persons => {
		console.log("phonebook:")
		persons.forEach(person => {
			console.log(`${person.name} ${person.number}`)
		})
		mongoose.connection.close();
	})
}