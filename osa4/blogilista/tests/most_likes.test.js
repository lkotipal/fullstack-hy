const testHelper = require('./test_helper')
const listHelper = require('../utils/list_helper')

describe('most likes', () => {
  const oneBlog = testHelper.listWithOneBlog
  const manyBlogs = testHelper.initialBlogs

  console.log('aaa')

  test('when list has no blogs return undefined', () => {
    const result = listHelper.mostLikes([])
    expect(result).toBe(null)
  })

  test('when list has only one blog return its author', () => {
    const result = listHelper.mostLikes(oneBlog)
    expect(result).toEqual({ author: oneBlog[0].author, likes: oneBlog[0].likes })
  })

  test('return author with most likes', () => {
    const result = listHelper.mostLikes(manyBlogs)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })
})
