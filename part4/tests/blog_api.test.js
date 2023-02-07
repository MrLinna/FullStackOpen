const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})
describe('all the blogs are returned and type is JSON', () => {
  test('right amount of JSON-type blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

describe('identifier property of the blog posts is named id', () => {
  test('id not _id', async () => {
    const response = await api.get('/api/blogs')
    //expect that field "id" exists
    response.body.map(blog => expect(blog.id).toBeDefined())
  })
})
afterAll(async () => {
  await mongoose.connection.close()
})