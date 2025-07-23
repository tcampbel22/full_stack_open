const { test, after, describe, beforeEach, only } = require('node:test')
const { default: mongoose } = require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const { fetchAllUsers, seedUsers } = require('../utils/test_helper')

const api = supertest(app)


describe('user tests based on populated db', async () => {

	beforeEach(async () => {
		await seedUsers()
	})

	test('create a new user and return 201', async () => {
		const usersAtStart = await fetchAllUsers()
		
		const newUser = {
			username: "Bob1",
			name: "Bobby",
			password: "secret"
		}
		
		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)
		
		const usersAtEnd = await fetchAllUsers()
		assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

		const usernames = usersAtEnd.map(u => u.username)
    	assert(usernames.includes(newUser.username))
	})

	test('creation of new user fails with 400 if username is not unique', async () => {
		const usersAtStart = await fetchAllUsers()
		
		const newUser = {
			username: "root",
			name: "Bobby",
			password: "secret"
		}
		
		const result = await api
		.post('/api/users')
		.send(newUser)
		.expect(400)
		.expect('Content-Type', /application\/json/)
		
		const usersAtEnd = await fetchAllUsers()
		assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    	assert(result.body.error.includes('expected `username` to be unique')) 
	})

	test('creation of new user fails with 400 if username is too short', async () => {
		const usersAtStart = await fetchAllUsers()
		
		const newUser = {
			username: "ro",
			name: "Bobby",
			password: "secret"
		}
		
		const result = await api
		.post('/api/users')
		.send(newUser)
		.expect(400)
		.expect('Content-Type', /application\/json/)
		
		const usersAtEnd = await fetchAllUsers()
		assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    	assert(result.body.error.includes('username must a minimum of 4 characters')) 
	})

	test('creation of new user fails with 400 if password is too short', async () => {
		const usersAtStart = await fetchAllUsers()
		
		const newUser = {
			username: "test",
			name: "Bobby",
			password: "se"
		}
		
		const result = await api
		.post('/api/users')
		.send(newUser)
		.expect(400)
		.expect('Content-Type', /application\/json/)
		
		const usersAtEnd = await fetchAllUsers()
		assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    	assert(result.body.error.includes('password must be minimum 3 characters')) 
	})
	
	after(async () => {
		await mongoose.connection.close()
	})
})