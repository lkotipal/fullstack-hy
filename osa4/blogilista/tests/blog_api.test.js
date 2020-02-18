const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('when there are initially some blogs saved', () => {
  let auth = 'bearer '

  beforeAll(async () => {
    await User.deleteMany({})
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < helper.initialUsers.length; ++i) {
      // eslint-disable-next-line no-await-in-loop
      const passwordHash = await bcrypt.hash(helper.initialUsers[i].password, 10)
      helper.initialUsers[i].passwordHash = passwordHash
    }
    await User.insertMany(helper.initialUsers)

    const users = await helper.usersInDB()
    helper.initialBlogs.forEach((b) => {
      // eslint-disable-next-line no-param-reassign
      // eslint-disable-next-line no-underscore-dangle
      b.user = users[0].id
    })

    const res = await api.post('/api/login')
      .send({ username: 'mluukkai', password: 'salainen' })
    auth = auth.concat(res.body.token)
  })

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('all blogs have proper IDs', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach((blog) => {
      // eslint-disable-next-line no-underscore-dangle
      expect(blog._id).toBeUndefined()
      // eslint-disable-next-line no-underscore-dangle
      expect(blog.__v).toBeUndefined()
      expect(blog.id).toBeTruthy()
    })
  })

  test('valid blog is added', async () => {
    await api.post('/api/blogs')
      .send(helper.testBlog)
      .set({ Authorization: auth })
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogs = await helper.blogsInDB()
    expect(blogs.length).toBe(helper.initialBlogs.length + 1)
  })

  test('likeless blog has 0 likes', async () => {
    const newBlog = { ...helper.testBlog }
    delete newBlog.likes
    await api.post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: auth })
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogs = await helper.blogsInDB()
    expect(blogs.length).toBe(helper.initialBlogs.length + 1)
    expect(blogs[blogs.length - 1].likes).toBe(0)
  })

  test('untitled blog is not added', async () => {
    const untitledBlog = { ...helper.testBlog }
    delete untitledBlog.title
    await api.post('/api/blogs')
      .send(untitledBlog)
      .set({ Authorization: auth })
      .expect(400)
  })

  test('urlless blog is not added', async () => {
    const urllessBlog = { ...helper.testBlog }
    delete urllessBlog.url
    await api.post('/api/blogs')
      .send(urllessBlog)
      .set({ Authorization: auth })
      .expect(400)
  })

  test('blog is deleted', async () => {
    const blogs = await helper.blogsInDB()
    const toDelete = blogs[0]
    await api.delete(`/api/blogs/${toDelete.id}`)
      .send()
      .set({ Authorization: auth })
      .expect(204)
    const newBlogs = await helper.blogsInDB()
    expect(newBlogs.length).toBe(helper.initialBlogs.length - 1)
    expect(newBlogs).not.toContainEqual(toDelete)
  })

  test('blog is edited', async () => {
    const blogs = await helper.blogsInDB()
    const editedBlog = { ...blogs[0], likes: 1337 }
    await api.put(`/api/blogs/${editedBlog.id}`)
      .send(editedBlog)
      .expect(200)
    const newBlogs = await helper.blogsInDB()
    expect(newBlogs.length).toBe(helper.initialBlogs.length)
    expect(newBlogs).toContainEqual(editedBlog)
  })

  test('no unauthorized adding', async () => {
    await api.post('/api/blogs')
      .send(helper.testBlog)
      .expect(401)
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})
