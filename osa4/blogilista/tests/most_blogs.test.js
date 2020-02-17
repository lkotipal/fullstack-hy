const testHelper = require('./test_helper')
const listHelper = require('../utils/list_helper')

describe('most blogs', () => {
  const oneBlog = testHelper.listWithOneBlog
  const manyBlogs = testHelper.initialBlogs

  test('when list has no blogs return null', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(null)
  })

  test('when list has only one blog return its author', () => {
    const result = listHelper.mostBlogs(oneBlog)
    expect(result).toEqual({ author: oneBlog[0].author, blogs: 1 })
  })

  test('return author with most blogs', () => {
    const result = listHelper.mostBlogs(manyBlogs)
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })
})
