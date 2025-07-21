const { test, after, beforeEach } = require('node:test')
const { default: mongoose } = require('mongoose')
const blogList = require('./blogList')
const Blog = require('../models/blog')
// const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')

const api = supertest(app)

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(blogList)
})

test('all blogs are returned'), async () => {
	const response = await api
		.get('/api/blogs')
		.expect(200).expect('Content-Type', /application\/json/)
	assert.strictEqual(response.body.length, blogList.length)
}

// describe('total likes', () => {
// 	const listWithOneBlog = [
// 	  {
// 		_id: '5a422aa71b54a676234d17f8',
// 		title: 'Go To Statement Considered Harmful',
// 		author: 'Edsger W. Dijkstra',
// 		url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
// 		likes: 5,
// 		__v: 0
// 	  }
// 	]
  
// 	test('when list has only one blog, equals the likes of that', () => {
// 	  const result = listHelper.totalLikes(listWithOneBlog)
// 	  assert.strictEqual(result, 5)
// 	})

// 	test('when list has 10 blogs, equals the likes of that', () => {
// 		const result = listHelper.totalLikes(blogList)
// 		assert.strictEqual(result, 240)
// 	  })
//   })

//   describe('favourite blog', () => {
// 	const correctBlog = {
// 		_id: '5a422bb71b54a676234d17f9',
// 		title: 'Understanding the JavaScript Event Loop',
// 		author: 'Jake Archibald',
// 		url: 'https://jakearchibald.com/2014/event-loop/',
// 		likes: 100,
// 		__v: 0
// 	  }
// 	test('list of 10 blogs, returns the one with most likes', () => {
// 	  const result = listHelper.favouriteBlog(blogList)
// 	  assert.deepStrictEqual(result, correctBlog)
// 	})
//   })

//   describe('most blogs', () => {
// 	test('list of 10 blogs, returns the author with the most blogs', () => {
// 		const correctResult = { author: 'Donald Knuth', blogs: 2 }
// 		const result = listHelper.mostBlogs(blogList)
// 	  assert.deepStrictEqual(result, correctResult)
// 	})
//   })
  
//   describe('most likes', () => {
// 	test('list of 10 blogs, returns the author with the most total likes', () => {
// 		const correctResult = { author: 'Jake Archibald', likes: 100 }
// 		const result = listHelper.mostLikes(blogList)
// 	  assert.deepStrictEqual(result, correctResult)
// 	})
//   })

after(async () => {
	await mongoose.connection.close()
})