const testHelper = require('./test_helper')
const listHelper = require('../utils/list_helper')

describe('most blogs', () => {
  const { testBlog, initialBlogs } = testHelper

  test('when list has no blogs return null', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(null)
  })

  test('when list has only one blog return its author', () => {
    const result = listHelper.mostBlogs([testBlog])
    expect(result).toEqual({ author: testBlog.author, blogs: 1 })
  })

  test('return author with most blogs', () => {
    const result = listHelper.mostBlogs(initialBlogs)
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })
})
