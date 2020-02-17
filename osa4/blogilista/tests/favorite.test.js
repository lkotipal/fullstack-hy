const testHelper = require('./test_helper')
const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {
  const oneBlog = testHelper.listWithOneBlog
  const manyBlogs = testHelper.initialBlogs

  test('when list has no blogs return undef', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(null)
  })

  test('when list has only one blog return that', () => {
    const result = listHelper.favoriteBlog(oneBlog)
    expect(result).toEqual(oneBlog[0])
  })

  test('return blog with most likes', () => {
    const result = listHelper.favoriteBlog(manyBlogs)
    expect(result).toEqual(manyBlogs[2])
  })
})
