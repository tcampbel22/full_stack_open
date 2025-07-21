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
	if (!blog.id)
		return response.status(404).end()
	response.json(blog)
})

blogsRouter.delete('/blogs/:id', async (request, response) => {
	const blog = await Blog.findByIdAndDelete(request.params.id)
	if (!blog.id)
		return response.status(404).end()
	response.status(204).end()
})

blogsRouter.post('/blogs', async (request, response) => {
  const blog = new Blog(request.body)
  if (!blog.title || !blog.url)
	return response.status(400).json({error: 'missing required params'}).end()
  if (!blog.likes)
	blog.likes = 0
  
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.put('/blogs/:id', async (request, response) => {
	const { title, author, url, likes } = request.body
	const id = request.params.id
	if (!title || !url || !author)
		return response.status(400).json({error: 'missing required params'}).end()
	const payload = {
		title,
		author,
		url,
		likes: likes ?? 0
	}
	const updatedBlog = await Blog.findByIdAndUpdate(
		id, 
		payload, 
		{ 
		  new: true,
		  validators: true,
		})
	if (!updatedBlog.id)
		return response.status(404).end()
	response.status(200).json(updatedBlog)
})

blogsRouter.put('/blogs/:id', async (request, response) => {
	const { title, author, url, likes } = request.body
	const id = request.params.id
	if (!title || !url || !author)
		return response.status(400).json({error: 'missing required params'}).end()
	const payload = {
		title,
		author,
		url,
		likes: likes ?? 0
	}
	const updatedBlog = await Blog.findByIdAndUpdate(
		id, 
		payload, 
		{ 
		  new: true,
		  runValidators: true,
		})
	if (!updatedBlog.id)
		return response.status(404).end()
	response.status(200).json(updatedBlog)
})

blogsRouter.patch('/blogs/:id', async (request, response) => {
	const payload = request.body
	const id = request.params.id
	const updatedBlog = await Blog.findByIdAndUpdate(
		id, 
		payload, 
		{ 
		  new: true,
		  runValidators: true,
		})
	if (!updatedBlog)
		return response.status(404).end()
	response.status(200).json(updatedBlog)
})


module.exports = blogsRouter