// const list = require('../tests/blogList')
const _ = require('lodash')
const supertest = require('supertest')
const app = require('../app')

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


  module.exports = {
	fetchAllBlogs,
	fetchBlogById,
	totalLikes,
	favouriteBlog,
	mostBlogs,
	mostLikes
  }