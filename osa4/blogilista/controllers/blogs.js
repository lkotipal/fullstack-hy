const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
    .populate('user', { username: 1, name: 1 })
  if (!blog) {
    return response.status(404).end()
  }
  return response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
  const { body, token } = request
  if (!token) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const decodedToken = jwt.verify(token, process.env.secret)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  // Dummy
  // const users = await User.find({})
  // const user = users[0]

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    // eslint-disable-next-line no-underscore-dangle
    user: user._id,
  })
  const result = await blog.save()
  // eslint-disable-next-line no-underscore-dangle
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  return response.status(201).json(result.toJSON)
})

blogsRouter.delete('/:id', async (request, response) => {
  const { token } = request
  if (!token) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const decodedToken = jwt.verify(token, process.env.secret)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).end()
  }

  if (blog.user.toString() !== decodedToken.id.toString()) {
    return response.status(403).json({ error: 'cannot delete blog made by someone else' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  return response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = { likes: request.body.likes }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter
