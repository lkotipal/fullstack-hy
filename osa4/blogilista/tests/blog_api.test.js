const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

describe('when there are initially some blogs saved', () => {
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

  test('new blog is added', async () => {
    const newBlog = helper.listWithOneBlog[0]
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogs = await helper.blogsInDB()
    expect(blogs.length).toBe(helper.initialBlogs.length + 1)
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})
