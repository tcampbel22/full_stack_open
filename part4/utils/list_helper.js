// const list = require('../tests/blogList')

const dummy = (blogs) => {
	return 1
  }

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

  module.exports = {
	dummy,
	totalLikes,
	favouriteBlog
  }