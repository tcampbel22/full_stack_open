require('express-async-errors')
const express = require('express');
const mongoose = require('mongoose');
const { info, error } = require('./utils/logger')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');


const app = express()

mongoose.connect(config.MONGODB_URI).then(() => {
	info('Connected to MongoDB')
	})
	.catch((err) => {
		error(err)
		error('Failed to connect to MongoDB')
		process.exit(1)
	})

app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app