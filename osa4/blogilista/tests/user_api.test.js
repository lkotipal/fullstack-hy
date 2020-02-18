const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('when there are initially some users saved', () => {
  beforeAll(async () => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < helper.initialUsers.length; ++i) {
      // eslint-disable-next-line no-await-in-loop
      const passwordHash = await bcrypt.hash(helper.initialUsers[i].password, 10)
      helper.initialUsers[i].passwordHash = passwordHash
    }
  })

  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
  })

  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all users are returned', async () => {
    const response = await api.get('/api/users')
    expect(response.body.length).toBe(helper.initialUsers.length)
  })

  test('all users have proper IDs and secret password hashes', async () => {
    const response = await api.get('/api/Users')
    response.body.forEach((user) => {
      // eslint-disable-next-line no-underscore-dangle
      expect(user._id).toBeUndefined()
      // eslint-disable-next-line no-underscore-dangle
      expect(user.__v).toBeUndefined()
      // eslint-disable-next-line no-underscore-dangle
      expect(user.passwordHash).toBeUndefined()
      expect(user.id).toBeTruthy()
    })
  })

  test('valid user is added', async () => {
    await api.post('/api/users')
      .send(helper.testUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogs = await helper.usersInDB()
    expect(blogs.length).toBe(helper.initialUsers.length + 1)
  })

  test('nameless user or too short name is not added', async () => {
    const namelessUser = { ...helper.testUser }
    delete namelessUser.username
    await api.post('/api/users')
      .send(namelessUser)
      .expect(400)

    namelessUser.username = 'a'
    await api.post('/api/users')
      .send(namelessUser)
      .expect(400)
  })

  test('passless user or too short pass is not added', async () => {
    const passlessUser = { ...helper.testUser }
    delete passlessUser.password
    await api.post('/api/users')
      .send(passlessUser)
      .expect(400)

    passlessUser.password = 'a'
    await api.post('/api/users')
      .send(passlessUser)
      .expect(400)
  })

  test('duplicate user is not added', async () => {
    const newUser = { ...helper.testUser, username: helper.initialUsers[0].username }
    await api.post('/api/users')
      .send(newUser)
      .expect(400)
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})
