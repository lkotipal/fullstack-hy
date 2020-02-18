const testHelper = require('./test_helper')
const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  const { testBlog, initialBlogs } = testHelper

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes([testBlog])
    expect(result).toBe(testBlog.likes)
  })

  test('when list has no blogs return 0', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('total likes with test list', () => {
    const result = listHelper.totalLikes(initialBlogs)
    expect(result).toBe(36)
  })
})
