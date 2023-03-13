const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('testPassword', 10)
  const user = new User({ username: 'testUser', passwordHash })
  await user.save()
})

const logIn = async () => {
  const response = await api
    .post('/api/login')
    .send({ username: 'testUser', password: 'testPassword' })
    .expect(200)
  return response.body.token
}

describe('all the blogs are returned and type is JSON', () => {
  test('right amount of JSON-type blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('identifier property of the blog posts is named id', async () => {
    const response = await helper.blogsInDb()
    //expect that field "id" exists
    response.map((blog) => expect(blog.id).toBeDefined())
  })
})

describe('successfully create a new blog post', () => {
  test('POST request works with valid input', async () => {
    const newBlog = {
      title: 'Post test',
      author: 'blog_api.test.js',
      url: 'http://npminstall.com',
      likes: 953
    }
    const token = await logIn()
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAfterPost = await helper.blogsInDb()
    expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length + 1)

    const blogTitles = blogsAfterPost.map((b) => b.title)
    expect(blogTitles).toContain('Post test')
  })

  test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const nonLikesBlog = {
      title: 'zero test',
      author: 'blog_api.test.js',
      url: 'http://randomurl.com'
    }
    const token = await logIn()
    await api
      .post('/api/blogs')
      .send(nonLikesBlog)
      .set({ Authorization: `Bearer ${token}` })

    const blogsAfterPost = await helper.blogsInDb()
    const blogTitlesAndLikes = blogsAfterPost.map(({ title, likes }) => ({
      title,
      likes
    }))
    const index = blogTitlesAndLikes.findIndex(
      (e) => e.title === nonLikesBlog.title
    )
    expect(blogTitlesAndLikes[index].likes).toBe(0)
  })

  test('if the title or url properties are missing, respond is status code 400.', async () => {
    const noTitle = {
      author: 'No title',
      url: 'https://notitle.com/',
      likes: 7
    }
    const noUrl = {
      title: 'No url',
      author: 'No Url',
      likes: 7
    }
    const neither = {
      author: 'Notitle Nourl',
      likes: 7
    }
    const token = await logIn()
    await api
      .post('/api/blogs')
      .send(noTitle)
      .set({ Authorization: `Bearer ${token}` })
      .expect(400)
    await api
      .post('/api/blogs')
      .send(noUrl)
      .set({ Authorization: `Bearer ${token}` })
      .expect(400)
    await api
      .post('/api/blogs')
      .send(neither)
      .set({ Authorization: `Bearer ${token}` })
      .expect(400)

    const blogsAfterPost = await helper.blogsInDb()
    expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length)
  })

  test('If the token is missing from the request, return status code 401 Unauthorized', async () => {
    const newBlog = {
      title: 'Post test',
      author: 'blog_api.test.js',
      url: 'http://npminstall.com',
      likes: 953
    }
    await api.post('/api/blogs').send(newBlog).expect(401)

    const blogsAfterPost = await helper.blogsInDb()
    expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('test that specific blog deletion works', async () => {
    const token = await logIn()

    const addBlogToDelete = {
      title: 'Delete test',
      author: 'blog_api.test.js',
      url: 'http://npminstall.com',
      likes: 953
    }
    const blogToDelete = await api
      .post('/api/blogs')
      .send(addBlogToDelete)
      .set({ Authorization: `Bearer ${token}` })

    await api
      .delete(`/api/blogs/${blogToDelete.body.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd.map((r) => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('blog updating works successfully ', () => {
  test('test updating with valid id', async () => {
    const BlogsAtStart = await helper.blogsInDb()
    const blogToUpdate = BlogsAtStart[0]
    const token = await logIn()
    const updatedBlog = {
      title: 'päivitetty',
      author: 'update test',
      url: 'localhost:3001/api/blogs',
      likes: 42,
      id: blogToUpdate.id
    }
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(BlogsAtStart.length)

    const ids = blogsAtEnd.map((b) => b.id)
    expect(ids).toContain(blogToUpdate.id)
    const afterUpdate = blogsAtEnd.filter((b) => b.id === blogToUpdate.id)
    expect(afterUpdate[0].title).toBe('päivitetty')
  })

  test('test returns status 400 if id is invalid', async () => {
    const invalidId = '234832923'
    const BlogsAtStart = await helper.blogsInDb()
    const token = await logIn()

    const updatedBlog = {
      title: 'päivitetty',
      author: 'update test',
      url: 'localhost:3001/api/blogs',
      likes: 42,
      id: invalidId
    }

    await api
      .put(`/api/blogs/${invalidId}`)
      .send(updatedBlog)
      .set({ Authorization: `Bearer ${token}` })
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(BlogsAtStart.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
