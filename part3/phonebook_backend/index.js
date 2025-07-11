require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person');
const person = require('./models/person');

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

app.get('/api/persons', (request, response) => {
	Person.find({}).then(persons => {
		response.json(persons);
	});
});

app.get('/api/persons/:id', (request, response) => {
	const id = request.params.id;
	Person.findById(id).then(person => {
		if (person)
			response.json(person);
		else
			response.status(404).end();
	})
	.catch(error => {
		console.error(error);
		response.status(400).send({ error: 'malformatted id' }).end();
	})
});

app.delete('/api/persons/:id', (request, response) => {
	const id = request.params.id;
	Person.findByIdAndDelete(id).then(person => {
		if (person)
			response.json(person);
		else
			response.status(404).end();
	})
	.catch(error => {
		console.error(error);
		response.status(400).send({ error: 'malformatted id' }).end();
	})
})

app.get('/info', (request, response) => {
	Person.countDocuments({}).then(count => {
		const time = new Date();
		response.send(`
			<p>Phonebook has info for ${count} people</p>
			<p>${time}</p>
		`);
	})
});

app.post('/api/persons', (request, response) => {
	const name = request.body.name;
	const number = request.body.number;
	if (!name || !number || !parseInt(number))
		response.status(400).json({"error": "name or number is invalid"}).end();
	else  {
		// console.log(`name: ${name}\nnumber: ${number}\nid: ${id}`);
		const person = new Person({
			name: name,
			number: number,
		});
		person.save().then(savedPerson => {
			response.json(savedPerson);
		})
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
