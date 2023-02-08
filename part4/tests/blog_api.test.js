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


describe('successfully create a new blog post', () => {
  test('POST request test', async () => {
    const newBlog =
    {
      title: 'Post test',
      author: 'blog_api.test.js',
      url: 'http://npminstall.com',
      likes: 953
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterPost = await api.get('/api/blogs')
    expect(blogsAfterPost.body).toHaveLength(helper.initialBlogs.length + 1)

    const blogTitles = blogsAfterPost.body.map(b => b.title)
    expect(blogTitles).toContain('Post test')
  })
})

describe('if the likes property is missing from the request, it will default to the value 0', () => {
  test('default 0 test', async () => {

    const nonLikesBlog =
    {
      title: 'zero test',
      author: 'blog_api.test.js',
      url: 'http://randomurl.com',
    }
    await api
      .post('/api/blogs')
      .send(nonLikesBlog)

    const blogsAfterPost = await api.get('/api/blogs')
    const blogTitlesAndLikes = blogsAfterPost.body.map(({ title,likes }) => ({ title, likes }))
    const index = blogTitlesAndLikes.findIndex(e => e.title === nonLikesBlog.title)
    expect(blogTitlesAndLikes[index].likes).toBe(0)

  })
})

afterAll(async () => {
  await mongoose.connection.close()
})