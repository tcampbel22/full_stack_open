require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person')

let persons = 
	[
		{ 
		"id": "1",
		"name": "Arto Hellas", 
		"number": "040-123456"
		},
		{ 
		"id": "2",
		"name": "Ada Lovelace", 
		"number": "39-44-5323523"
		},
		{ 
		"id": "3",
		"name": "Dan Abramov", 
		"number": "12-43-234345"
		},
		{ 
		"id": "4",
		"name": "Mary Poppendieck", 
		"number": "39-23-6423122"
	}
]

morgan.token('post', function getBody (req) {
	return JSON.stringify(req.body)
})

const app = express();
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'));
app.use(express.static('dist'))

// app.get('/', (request, response) => {
// 	response.send('<h1>Welcome to the Phonebook</h1>');
// });

app.get('/api/persons', (request, response) => {
	// Person.find({}).then(persons => {
	// 	persons.forEach(person => {
	// 		console.log(`${person.name} ${person.number}`)
	// 	})

	response.json(Person);
});

app.get('/api/persons/:id', (request, response) => {
	const id = request.params.id;
	const person = persons.find(p => p.id === id);
	if (!person)
		return response.status(404).end();
	response.json(person);
});

app.delete('/api/persons/:id', (request, response) => {
	const id = request.params.id;
	const person = persons.find(p => p.id === id);
	if (!person)
		return response.status(404).end();
	persons = persons.filter(p => p.id !== id);
	response.status(204).json(person);
})

app.get('/info', (request, response) => {
	const len = persons.length;
	const time = new Date();
	response.send(`
		<p>Phonebook has info for ${len} people</p>
		<p>${time}</p>
		`);
});

app.post('/api/persons', (request, response) => {
	const name = request.body.name;
	const number = request.body.number;
	if (!name || !number || !parseInt(number))
		response.status(400).json({"error": "name or number is invalid"}).end();
	else if (persons.find(n => n.name === name))
		response.status(400).json({"error": "name must be unique"}).end();
	else  {
		const id = Math.floor(Math.random() * 10000000);
		// console.log(`name: ${name}\nnumber: ${number}\nid: ${id}`);
		const person = {
			"id": id,
			"name": name,
			"number": number,
		}
		persons = persons.concat(person);
		response.send(person);
		// console.log(persons);
	}
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)
const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
