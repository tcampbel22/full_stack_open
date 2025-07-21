const Blog = require('../models/blog')
const { info } = require('../utils/logger')
const blogsRouter = require('express').Router()


blogsRouter.get('/blogs', async (request, response) => {
  const blogs = await Blog.find({})
//   blogs.map(b => console.log(b))
  response.json(blogs)
})

blogsRouter.get('/blogs/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id)
  //   blogs.map(b => console.log(b))
	response.json(blog)
  })

blogsRouter.post('/blogs', async (request, response) => {
  
  const blog = new Blog(request.body)
  if (!blog.likes)
	blog.likes = 0
  if (!blog.title || !blog.url)
	return response.status(400).end()
  
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter