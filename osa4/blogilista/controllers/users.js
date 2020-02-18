const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { body } = request
  const saltRounds = 10

  if (!body.password) {
    const e = new Error('User validation failed: no password given')
    e.name = 'ValidationError'
    throw e
  } else if (body.password.length < 3) {
    const e = new Error('User validation failed: password too short')
    e.name = 'ValidationError'
    throw e
  }

  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, author: 1 })
  response.json(users.map((user) => user.toJSON()))
})

module.exports = usersRouter
