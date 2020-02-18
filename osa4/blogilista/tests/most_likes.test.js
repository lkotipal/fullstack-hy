const testHelper = require('./test_helper')
const listHelper = require('../utils/list_helper')

describe('most likes', () => {
  const { testBlog, initialBlogs } = testHelper

  test('when list has no blogs return undefined', () => {
    const result = listHelper.mostLikes([])
    expect(result).toBe(null)
  })

  test('when list has only one blog return its author', () => {
    const result = listHelper.mostLikes([testBlog])
    expect(result).toEqual({ author: testBlog.author, likes: testBlog.likes })
  })

  test('return author with most likes', () => {
    const result = listHelper.mostLikes(initialBlogs)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })
})
