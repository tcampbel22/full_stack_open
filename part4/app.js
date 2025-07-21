const express = require('express');
const mongoose = require('mongoose');
const { info, error } = require('./utils/logger')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')


const app = express()

mongoose.connect(config.MONGODB_URI).then(() => {
	info('Connected to MongoDB')
	})
	.catch(() => {
		error('Failed to connect to MongoDB')
		process.exit(1)
	})

app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
module.exports = app