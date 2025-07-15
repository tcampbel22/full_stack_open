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

const errorHandler = (err, request, response, next) => {
	error(err.message)
	if (err.name === 'CastError')
	  return response.status(400).send({ error: 'malformatted id' }).end()
	else if (err.name === 'ValidationError')
	  return response.status(400).json({ error: error.message })
	next(err)
  }

module.exports = { errorHandler, requestLogger, unknownEndpoint }