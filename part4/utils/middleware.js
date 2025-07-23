const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { info, error } = require('./logger')

const requestLogger = (request, response, next) => {
	info('    --------    ')
	info('Method: ', request.method)
	info('Path: ', request.path)
	info('Body: ', request.body)
	info('    --------    ')
	next()
}

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
  }

const errorHandler = async (err, request, response, next) => {
	error(err.message)
	if (err.name === 'CastError')
	  return response.status(400).send({ error: 'malformatted id' }).end()
	else if (err.name === 'ValidationError')
	  return response.status(400).json({ error: err.message })
	else if (err.name === 'MongoServerError' && err.message.includes('E11000 duplicate key error collection'))
		return response.status(400).json({ error: 'expected `username` to be unique' })
	else if (err.name ===  'JsonWebTokenError')
		return response.status(401).json({ error: 'token invalid' })
	else if (err.name ===  'TokenExpiredError')
		return response.status(401).json({ error: 'token expired' })
	next(err)
  }

const tokenExtractor = async (request, response, next) => {  
	const authorization = request.get('authorization')  
	if (authorization && authorization.startsWith('Bearer ')) {
		request.token = authorization.replace('Bearer ', '')    
	}
	next()
}

const userExtractor = async (request, response, next) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	request.user = await User.findById(decodedToken.id)
	if (!request.user)
		return response.status(400).json({ error: 'userId missing or not valid'}).end()
	next()
}

module.exports = { 
	errorHandler, 
	requestLogger, 
	unknownEndpoint, 
	tokenExtractor,
	userExtractor
 }