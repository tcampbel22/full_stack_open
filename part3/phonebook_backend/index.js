require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person');

morgan.token('post', function getBody (req) {
	return JSON.stringify(req.body)
})

const app = express();
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'));
app.use(express.static('dist'))

//Error Handler
const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.name === 'CastError')
		return response.status(400).send({ error: 'malformatted id' }).end();
	else if (error.name === 'ValidationError') 
		return response.status(400).json({ error: error.message })
	next(error);
}

//GET all people in phonebook
app.get('/api/persons', (request, response, next) => {
	Person.find({}).then(persons => {
		if (persons)
			response.json(persons);
		else
			response.status(404).send({ error: 'No contacts in phonebook' }).end();
	})
	.catch(error => next(error));
});

//GET a specific person by id in phonebook
app.get('/api/persons/:id', (request, response, next) => {
	const id = request.params.id;
	Person.findById(id).then(person => {
		if (person)
			response.json(person);
		else
			response.status(404).end();
	})
	.catch(error => next(error));
});

//DELETE a specific person by id in phonebook
app.delete('/api/persons/:id', (request, response, next) => {
	const id = request.params.id;
	Person.findByIdAndDelete(id).then(person => {
		if (person)
			response.status(204).end();
		else
			response.status(404).end();
	})
	.catch(error => next(error));
})

//GET number  of people in phonebook (Legacy)
app.get('/info', (request, response, next) => {
	Person.countDocuments({}).then(count => {
		const time = new Date();
		response.send(`
			<p>Phonebook has info for ${count} people</p>
			<p>${time}</p>
		`);
	})
	.catch(error => next(error));
});

//POST add a contact to the phonebook
app.post('/api/persons', (request, response, next) => {
	const name = request.body.name;
	const number = request.body.number;
	// console.log(`name: ${name}\nnumber: ${number}\nid: ${id}`);
	const person = new Person({
		name: name,
		number: number,
	});
	person.save().then(savedPerson => {
		response.json(savedPerson);
	})
	.catch(error => next(error));
});

//PUT Update a contact infomation
app.put('/api/persons/:id', (request, response, next) => {
	const { number } = request.body;
	const id = request.params.id;
	Person.findById(id).then(person => {
		if (!person)
			return response.status(404).end();
		person.number = number;
		person.save().then(updatedContact => {
			response.json(updatedContact);
		})
		.catch(error => next(error));
	})
	.catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' }).end();
  }
  
app.use(unknownEndpoint)
app.use(errorHandler)
const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
