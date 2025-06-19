const express = require('express');

let notes = [
	{
		id: "1",
		content: "HTML is easy",
		important: true
	},
	{
		id: "2",
		content: "Browser can execute only JavaScript",
		important: false
	},
	{
		id: "3",
		content: "GET and POST are the most important methods of HTTP protocol",
		important: true
	}
]

const app = express();
app.use(express.json());

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
	const id = request.params.id;
	const note = notes.find(note => note.id === id);
	if (!note)
		response.status(404).end();
	else
		response.json(note);
})

app.delete('/api/notes/:id', (request, response) => {
	const id = request.params.id;
	const note = notes.find(note => note.id === id);
	if (!note)
		response.status(404).end();
	else  {
		notes = notes.filter(note => note.id !== id);
		response.status(204).end();
	}
})

const generateId = () => {
	const maxId = notes.length > 0 ? Math.max(...notes.map(note => Number(note.id))) : 0;
	return String(maxId + 1);
}

app.post('/api/notes', (request, response) => {
	const body = request.body;
	if (!body.content)
		return response.status(400).json({ error: "content missing" });
	const note = {
		id: generateId(),
		content: body.content,
		important: body.important || false,
	}
	notes = notes.concat(note);
	response.status(201).json(note).end();
})


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)