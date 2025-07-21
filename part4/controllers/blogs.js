const Blog = require('../models/blog')
const blogsRouter = require('express').Router()
const errorHandler =require('../utils/middleware')


blogsRouter.get('/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    if (blogs)
		return response.json(blogs)
	response.status(404).end()
  })
  .catch(error => next(error))
})

blogsRouter.post('/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
  .catch(error => next(error))
})

module.exports = blogsRouter