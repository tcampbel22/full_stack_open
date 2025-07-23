const Blog = require('../models/blog')
const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 })
//   blogs.map(b => console.log(b))
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id)
	if (!blog)
		return response.status(404).end()
	response.json(blog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
	const blog = await Blog.findById(request.params.id)
	if (!blog)
		return response.status(400).json({ error: "blogId is missing or invalid" }).end()
	if (request.user.id !== blog.user.toString())
		return response.status(401).json({ error: 'user authentication error' })
	await Blog.findByIdAndDelete(request.params.id)
	response.status(204).end()
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
	const body = request.body
	const user = request.user
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user.id
	})
	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
	const body = request.body
	const blog = await Blog.findById(request.params.id)
	if (!blog)
		return response.status(404).json({ error: "blog cannot be found" }).end()
	if (request.user.id !== blog.user.toString())
		return response.status(401).json({ error: 'user authentication error' })
	if (!body.title || !body.url || !body.author)
		return response.status(400).json({error: 'missing required params'}).end()
	const payload = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes ?? 0,
		user: request.user.id
	}
	const updatedBlog = await Blog.findByIdAndUpdate(
		request.params.id, 
		payload, 
		{ new: true }
	)
	response.status(200).json(updatedBlog)
})


blogsRouter.patch('/:id', middleware.userExtractor, async (request, response) => {
	const payload = request.body
	const blog = await Blog.findById(request.params.id)
	if (!blog)
		return response.status(404).json({ error: "blog cannot be found" }).end()
	if (request.user.id !== blog.user.toString())
		return response.status(401).json({ error: 'user authentication error' })
	const updatedBlog = await Blog.findByIdAndUpdate(
		request.params.id, 
		payload, 
		{ new: true }
	)
	response.status(200).json(updatedBlog)
})


module.exports = blogsRouter