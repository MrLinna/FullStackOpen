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
    const nonLikesBlog = {
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

describe('if the title or url properties are missing, respond is status code 400.', () => {
  test('Blog without title/url is not added', async () => {
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
    await api
      .post('/api/blogs')
      .send(noTitle)
      .expect(400)
    await api
      .post('/api/blogs')
      .send(noUrl)
      .expect(400)
    await api
      .post('/api/blogs')
      .send(neither)
      .expect(400)

    const blogsAfterPost = await api.get('/api/blogs')
    expect(blogsAfterPost.body).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a note', () => {
  test('test that specific blog deletion works', async () => {
    const BlogsAtStart = await api.get('/api/blogs')
    const blogToDelete = BlogsAtStart.body[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(
      BlogsAtStart.body.length - 1
    )

    const titles = blogsAtEnd.body.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.content)
  })
})

describe('update of a note works as it should', () => {
  test('test updating with valid id', async () => {
    const BlogsAtStart = await api.get('/api/blogs')
    const blogToUpdate = BlogsAtStart.body[0]
    console.log('blogtoupdate: ', blogToUpdate )
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
      .expect(200)

    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(
      BlogsAtStart.body.length
    )

    const ids = blogsAtEnd.body.map(b => b.id)
    expect(ids).toContain(blogToUpdate.id)
    const afterUpdate = blogsAtEnd.body.filter(b => b.id === blogToUpdate.id)
    expect(afterUpdate[0].title).toBe('päivitetty')

  })

  test('test returns status 400 if id is invalid', async () => {
    const invalidId = '234832923'
    const BlogsAtStart = await api.get('/api/blogs')

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
      .expect(400)

    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(BlogsAtStart.body.length)

  })

})

afterAll(async () => {
  await mongoose.connection.close()
})