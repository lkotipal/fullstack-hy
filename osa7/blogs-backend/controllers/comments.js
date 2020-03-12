const router = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')

router.post('/:id/comments', async (request, response) => {
  const comment = new Comment(request.body)
  const blog = await Blog.findById(request.params.id)

  if (comment.content) {
    return response.status(400).send({ error: 'content missing' })
  }

  comment.blog = blog
  const savedComment = await comment.save()

  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()

  response.status(201).json(savedComment)
})

module.exports = router