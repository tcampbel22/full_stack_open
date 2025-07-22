const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()


const getTokenFrom = request => {  
	const authorization = request.get('authorization')  
	if (authorization && authorization.startsWith('Bearer '))  
		return authorization.replace('Bearer ', '')    
	return null
}

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

blogsRouter.delete('/:id', async (request, response) => {
	const blog = await Blog.findByIdAndDelete(request.params.id)
	if (!blog)
		return response.status(404).end()
	response.status(204).end()
})

blogsRouter.post('/', async (request, response) => {
	const body = request.body
	let user;
	if (process.env.NODE_ENV !== 'test') {
		const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
		if (!decodedToken.id)
			return response.status(401).json({ error: 'token invalid' }) 
		user = await User.findById(decodedToken.id)
	}
	else
		user = await User.findById(body.user)
	if (!user)
		return response.status(400).json({ error: 'userId missing or not valid'}).end()
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

blogsRouter.put('/:id', async (request, response) => {
	const body = request.body
	const id = request.params.id
	const user = await User.findById(body.user)
	if (!user)
		return response.status(400).json({ error: 'userId missing or not valid'}).end()
	if (!body.title || !body.url || !body.author)
		return response.status(400).json({error: 'missing required params'}).end()
	const payload = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes ?? 0,
		user: user.id
	}
	const updatedBlog = await Blog.findByIdAndUpdate(
		id, 
		payload, 
		{ 
		  new: true,
		  validators: true,
		})
	if (!updatedBlog)
		return response.status(404).end()
	response.status(200).json(updatedBlog)
})


blogsRouter.patch('/:id', async (request, response) => {
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