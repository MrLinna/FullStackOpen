const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})



blogsRouter.post('/', async (request, response) => {
  const body = request.body
  console.log(request.body)
  const blog = new Blog(
    {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0
    }
  )
  console.log(blog)
  const savedBlog = await blog.save()
  console.log(savedBlog)
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter