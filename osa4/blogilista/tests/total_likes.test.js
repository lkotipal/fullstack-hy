const testHelper = require('./test_helper')
const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  const oneBlog = testHelper.listWithOneBlog
  const manyBlogs = testHelper.initialBlogs

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(oneBlog)
    expect(result).toBe(oneBlog[0].likes)
  })

  test('when list has no blogs return 0', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('total likes with test list', () => {
    const result = listHelper.totalLikes(manyBlogs)
    expect(result).toBe(36)
  })
})
