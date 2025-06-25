const express = require('express');

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

const app = express();
app.use(express.json());

app.get('/', (request, response) => {
	response.send('<h1>Welcome to the Phonebook</h1>');
});

app.get('/api/persons', (request, response) => {
	response.json(persons);
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
		persons = persons.concat({
			"id": id,
			"name": name,
			"number": number,
		});
		response.send(persons);
		// console.log(persons);
	}
});

app.listen(3001);
console.log('Server running on port 3001');
