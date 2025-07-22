const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('blogs', { userId: 0 })
	response.status(200).json(users)
})


usersRouter.get('/:id', async (request, response) => {
	const id = request.params.id
	const user = await User.findById(id)
	if (!user)
		return response.status(404).end()
	response.status(200).json(user)
})


usersRouter.post('/', async (request, response) => {
	const { username, name, password } = request.body

	if (password.length < 3)
		return response.status(400).json({error: 'password must be minimum 3 characters'})
	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)

	const user = new User({
		username,
		name,
		passwordHash
	})

	const savedUser = await user.save()
	response.status(201).json(savedUser)
})

module.exports = usersRouter