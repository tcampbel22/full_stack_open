const { test, after, describe, beforeEach, only } = require('node:test')
const { default: mongoose } = require('mongoose')
const assert = require('node:assert')
const blogList = require('./blogList')
const Blog = require('../models/blog')
const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(blogList)
})

test('all blogs are returned', async () => {
	const response = await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
	assert.strictEqual(response.body.length, blogList.length)
})

test('verfies identifier as id', async () => {
	const response = await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
		response.body.forEach(b => {
			assert.ok(b.id)
		})
})

test.only('new blog is saved to db', async () => {
	const newBlog = {
			title: 'New post',
			author: 'Bob',
			url: 'https://www.test.com',
			likes: 30,
	}
	const savedBlog = await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	newBlog.id = savedBlog.body.id
	const response = await api.get(`/api/blogs/${savedBlog.body.id}`).expect(200)
	assert.deepStrictEqual(response.body, newBlog)
	const allBlogs = await api.get(`/api/blogs`).expect(200)
	assert.strictEqual(allBlogs.body.length, blogList.length + 1)
})

test('is the like property empty', async () => {
	const noLikes = {
		title: 'New post',
		author: 'Bob',
		url: 'https://www.test.com',
	}
	const response = await api
		.post('/api/blogs')
		.send(noLikes)
		.expect(201)
		.expect('Content-Type', /application\/json/)
	assert.strictEqual(response.body.likes, 0)
})

test('no title in request', async () => {
	const noTitle = {
		author: 'Bob',
		url: 'https://www.test.com',
		likes: 20
	}
	await api
		.post('/api/blogs')
		.send(noTitle)
		.expect(400)
	const response = await api.get('/api/blogs').expect(200)
	assert.strictEqual(response.body.length, blogList.length)
})

test('no url in request', async () => {
	const noUrl = {
		title: 'New post',
		author: 'Bob',
		likes: 20
	}
	await api
		.post('/api/blogs')
		.send(noUrl)
		.expect(400)
	const response = await api.get('/api/blogs')
	assert.strictEqual(response.body.length, blogList.length)
})


describe('total likes', () => {
	const listWithOneBlog = [
	  {
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
		likes: 5,
		__v: 0
	  }
	]
  
	test('when list has only one blog, equals the likes of that', () => {
	  const result = listHelper.totalLikes(listWithOneBlog)
	  assert.strictEqual(result, 5)
	})

	test('when list has 10 blogs, equals the likes of that', () => {
		const result = listHelper.totalLikes(blogList)
		assert.strictEqual(result, 240)
	  })
  })

  describe('favourite blog', () => {
	const correctBlog = {
		_id: '5a422bb71b54a676234d17f9',
		title: 'Understanding the JavaScript Event Loop',
		author: 'Jake Archibald',
		url: 'https://jakearchibald.com/2014/event-loop/',
		likes: 100,
		__v: 0
	  }
	test('list of 10 blogs, returns the one with most likes', () => {
	  const result = listHelper.favouriteBlog(blogList)
	  assert.deepStrictEqual(result, correctBlog)
	})
  })

  describe('most blogs', () => {
	test('list of 10 blogs, returns the author with the most blogs', () => {
		const correctResult = { author: 'Donald Knuth', blogs: 2 }
		const result = listHelper.mostBlogs(blogList)
	  assert.deepStrictEqual(result, correctResult)
	})
  })
  
  describe('most likes', () => {
	test('list of 10 blogs, returns the author with the most total likes', () => {
		const correctResult = { author: 'Jake Archibald', likes: 100 }
		const result = listHelper.mostLikes(blogList)
	  assert.deepStrictEqual(result, correctResult)
	})
  })

after(async () => {
	await mongoose.connection.close()
})