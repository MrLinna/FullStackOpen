const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

describe('Invalid users are not created', () => {
  test('do not create invalid users', async () => {
    const tooShortUsername = {
      name: 'Short Username',
      username: 'SU',
      password: 'aödfjdafökladj'
    }
    const tooShortPassword = {
      name: 'Short Password',
      username: 'Shortpass',
      password: 'a'
    }

    const result1 = await api
      .post('/api/users')
      .send(tooShortUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result1.body.error).toContain(
      'User validation failed: username: Path `username` (`SU`) is shorter than the minimum allowed length (3).'
    )

    const result2 = await api
      .post('/api/users')
      .send(tooShortPassword)
      .expect(403)
      .expect('Content-Type', /application\/json/)
    expect(result2.body.error).toContain('minimum length of the password is 3')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })

  test('do not create duplicate usernames', async () => {
    const usersAtStart = await helper.usersInDb()
    const sameUsername = {
      name: 'Same Username',
      username: usersAtStart[0].username,
      password: 'aödfjdafökladj'
    }
    const result = await api
      .post('/api/users')
      .send(sameUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('expected `username` to be unique')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
