const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(request.user._id)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  await savedBlog.populate('user', { name: 1, username: 1 })
  response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return request.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blogToDelete = await Blog.findById(request.params.id)
  if (!blogToDelete) {
    console.log('blog does not exist')
    return response.status(404).json({ error: 'blog does not exist' })
  }
  if (blogToDelete.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'Not authorized' })
  }

  await blogToDelete.remove()
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user.id,
    comments: body.comments
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true
  })

  if (updatedBlog) {
    await updatedBlog.populate('user', { name: 1, username: 1 })
    response.json(updatedBlog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.put('/:id/comments', async (request, response) => {
  const body = request.body
  const blog = {
    ...body,
    user: body.user.id
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true
  })
  if (updatedBlog) {
    await updatedBlog.populate('user', { name: 1, username: 1 })
    response.json(updatedBlog)
  } else {
    response.status(404).end()
  }
})
module.exports = blogsRouter
