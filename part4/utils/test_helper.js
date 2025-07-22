// const list = require('../tests/blogList')
const _ = require('lodash')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')

const api = supertest(app)

const totalLikes = (blogs) => {
	return blogs.reduce((acc, blog) => {
		// console.log(acc + blog.likes)
		return acc + blog.likes
	}, 0)
}

const favouriteBlog = (blogs) => {
	let max = 0;
	let favourite;
	blogs.map(blog => {
		if (blog.likes > max) {
			max = blog.likes;
			favourite = blog;
		}
	})
	// console.log(favourite);
	return favourite
}
// Did without lodash, uses flat map and reduce to create object with authors and blog count. 
const mostBlogs = (blogsList) => {
	const authors = blogsList
		.flatMap(blog => blog.author.split(',').map(a => a.trim()))
		.reduce((acc, curr) => {
			acc[curr] = (acc[curr] || 0) + 1
			return acc;
		}, {})
	const [author, blogs] = Object.entries(authors).reduce((max, current) => {
		return current[1] > max[1] ? current : max
	})
	return { author, blogs }
}
// uses lodash, group the authors together, total each of their likes, split into pairs in arrays 
// and extract the largest, convert to object
const mostLikes = (blogs) => {
	return _.chain(blogs)
		.groupBy('author')
		.mapValues(group => _.sumBy(group, 'likes'))
		.toPairs()
		.maxBy(([, likes]) => likes)
		.thru(([author, likes]) => ({author, likes}))
		.value()
}


const fetchBlogById = async (id) => {
	return await api
		.get(`/api/blogs/${id}`)
		.expect(200)
		.expect('Content-Type', /application\/json/)
}

const fetchAllBlogs = async () => {
	return await api
		.get(`/api/blogs`)
		.expect(200)
		.expect('Content-Type', /application\/json/)
}

const fetchAllUsers = async () => {
	const users = await User.find({})
	return users.map(u => u.toJSON())
}

const getAllBlogs = async () => {
	const blogs = await Blog.find({})
	return blogs.map(b => b.toJSON())
}

const nonExistingId = async () => {
	const blog = new Blog(
		{ 
			title: 'willremovethissoon',
			author: 'fake',
			url: 'fake',
			likes: 0 
		})
	await blog.save()
	await blog.deleteOne()
  
	return blog._id.toString()
  }

const fetchRootId = async () => {
	const root = await User.findOne({ username: 'root' })
	return root._id.toString()
}

	
const seedUsers = async () => {
	await User.deleteMany({})
	const passwordHash = await bcrypt.hash('secret', 10)
	const user = new User({ 
		username: 'root',
		name: 'bobbo',
		passwordHash 
	})
	await user.save()
}


  module.exports = {
	getAllBlogs,
	seedUsers,
	fetchRootId,
	nonExistingId,
	fetchAllUsers,
	fetchAllBlogs,
	fetchBlogById,
	totalLikes,
	favouriteBlog,
	mostBlogs,
	mostLikes
  }