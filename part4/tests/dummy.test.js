const { test, describe } = require('node:test')
const assert = require('node:assert')
const blogList = require('./blogList')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
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
		assert.strictEqual(result, 150)
	  })
  })

  describe('favourite blog', () => {
	const correctBlog = {
		_id: '5a423dd71b54a676234d1801',
		title: 'The Pragmatic Programmer: Your Journey to Mastery',
		author: 'Andrew Hunt, David Thomas',
		url: 'https://www.goodreads.com/book/show/4099.The_Pragmatic_Programmer',
		likes: 30,
		__v: 0
	  }
	test('list of 10 blogs, returns the one with most likes', () => {
	  const result = listHelper.favouriteBlog(blogList)
	  assert.deepStrictEqual(result, correctBlog)
	})
  })