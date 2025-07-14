const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

// const password = process.argv[2]

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url).then(result => {
	console.log("cnnected to MongoDB");
  })
  .catch(error => {
	console.error("Failed to connect to MongoDB", error.message);
  });

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})


noteSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Note', noteSchema)

// const note = new Note({
//   content: 'HTML is easy',
//   important: true,
// })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })



Note.find({}).then(result => {
	result.forEach(note => {
	  console.log(note)
	})
	mongoose.connection.close()
  })

  
  
app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})
