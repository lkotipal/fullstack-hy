const testHelper = require('./test_helper')
const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {
  const { testBlog, initialBlogs } = testHelper

  test('when list has no blogs return undef', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(null)
  })

  test('when list has only one blog return that', () => {
    const result = listHelper.favoriteBlog([testBlog])
    expect(result).toEqual(testBlog)
  })

  test('return blog with most likes', () => {
    const result = listHelper.favoriteBlog(initialBlogs)
    expect(result).toEqual(initialBlogs[2])
  })
})
