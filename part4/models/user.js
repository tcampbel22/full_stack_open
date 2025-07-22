const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		minLength: [3, 'username must a minimum of 4 characters'],
		maxLength: [20, 'username must a maximum of 20 characters'],
		required: true,
		unique: true,
		validate: {
			validator: function(v) {
				return /^[a-zA-Z0-9]+$/.test(v)
			},
			message: 'username must only contain letters and numbers'
		}
	},
	name: { 
		type: String,
		minLength: [3, 'name must a minimum of 2 characters'],
		maxLength: [20, 'name must a maximum of 20 characters'],
		required: true,
		validate: {
			validator: function(v) {
				return /^[a-zA-Z]+$/.test(v)
			},
			message: 'username must only contain letters'
		}
	},
	passwordHash: String,
	blogs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Blog'

		}
	],
})

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.passwordHash
	}
})

const User = mongoose.model('User', userSchema)

module.exports = User