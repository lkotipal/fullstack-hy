const Blog = require('../models/blog')
const User = require('../models/user')

const testBlog = {
  title: 'aaaaa',
  author: 'Pantsukimies Kotipoltto',
  url: 'http://localhost:3001',
  likes: 9001,
}

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
]

const initialUsers = [
  {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    password: 'salainen',
  },
  {
    username: 'motipalo',
    name: 'Pantsukimies Kotipoltto',
    password: 'salainen',
  },
]

const testUser = {
  username: 'luser',
  name: 'Stella Artois',
  password: 'qwerty',
}

const usersInDB = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  testBlog, initialBlogs, testUser, initialUsers, blogsInDB, usersInDB,
}
