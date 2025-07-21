const { test, after, describe, beforeEach, only } = require('node:test')
const { default: mongoose } = require('mongoose')
const assert = require('node:assert')
const blogList = require('./blogList')
const Blog = require('../models/blog')
const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('test based on populated db', async () => {

	beforeEach(async () => {
		await Blog.deleteMany({})
		await Blog.insertMany(blogList)
	})
	
	describe('fetch entire blog list', async () => {
		test('returns 200 if all blogs are returned as json', async () => {
			const response = await listHelper.fetchAllBlogs()
			assert.strictEqual(response.body.length, blogList.length)
		})
	})

	test('verfies identifier as id', async () => {
		const response = await listHelper.fetchAllBlogs()
		response.body.forEach(b => {
			assert.ok(b.id)
		})
	})

	test('new blog is saved to db', async () => {
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
		const response = await listHelper.fetchBlogById(savedBlog.body.id)
		assert.deepStrictEqual(response.body, newBlog)
		const allBlogs = await listHelper.fetchAllBlogs()
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
	
	test('delete a blog by id', async () => {
		const deleteMe = {
			title: 'delete',
			author: 'Bob',
			url: 'https://www.test.com',
			likes: 20
		}
		
		const toBeDeleted = await api
			.post('/api/blogs')
			.send(deleteMe)
			.expect(201)
			.expect('Content-Type', /application\/json/)
		
		let response = await api.get('/api/blogs').expect(200)
		assert.strictEqual(response.body.length, blogList.length + 1)
		await api
			.delete(`/api/blogs/${toBeDeleted.body.id}`)
			.expect(204)
		
		response = await api.get('/api/blogs').expect(200)
		assert.strictEqual(response.body.length, blogList.length)
	})

	test.only('update entire blog', async () => {
		const newBlog = {
			title: 'new title',
			author: 'new author',
			url: 'https://www.new_url.com',
			likes: 50
		}
		const previousState = await listHelper.fetchBlogById('5a423dd71b54a676234d1801')
		const updatedBlog = await api
			.put(`/api/blogs/5a423dd71b54a676234d1801`)
			.send(newBlog)
			.expect(200)
			.expect('Content-Type', /application\/json/)
		assert.strictEqual(previousState.id, updatedBlog.id)
		assert.notDeepEqual(previousState, updatedBlog)
		const response = await api.get('/api/blogs').expect(200)
		assert.strictEqual(response.body.length, blogList.length)
	
	})
	
	
	after(async () => {
		await mongoose.connection.close()
	})

})

describe('Non database test', async () => {

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
})
