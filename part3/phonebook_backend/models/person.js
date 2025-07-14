require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url).then(() => {
  console.log('connected to MongoDB')
})
  .catch(error => {
    console.error('Failed to connect to MongoDB', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    maxLength: 20,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d{5,}$/.test(v)
      },
      message: props => `${props.value} is an invalid phone number`
    },
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
