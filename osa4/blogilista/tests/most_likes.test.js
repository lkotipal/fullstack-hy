const testHelper = require('./test_helper')
const listHelper = require('../utils/list_helper')

describe('most likes', () => {
  const oneBlog = testHelper.listWithOneBlog
  const manyBlogs = testHelper.initialBlogs

  test('when list has no blogs return undefined', () => {
    const result = listHelper.mostLikes([])
    expect(result).toBe(null)
  })

  test('when list has only one blog return its author', () => {
    const result = listHelper.mostLikes(oneBlog)
    expect(result).toEqual(oneBlog[0].author)
  })

  test('return author with most likes', () => {
    const result = listHelper.mostLikes(manyBlogs)
    expect(result).toEqual('Edsger W. Dijkstra')
  })
})
