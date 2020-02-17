const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1

const totalLikes = (blogs) => _.sumBy(blogs, 'likes')

const favoriteBlog = (blogs) => (
  blogs.length === 0 ? null : _.maxBy(blogs, 'likes')
)

// Fix it in post

const mostBlogs = (blogs) => (
  blogs.length === 0 ? null : _.head(_(blogs)
    .countBy((blog) => blog.author)
    .entries()
    .maxBy(_.last))
)

const mostLikes = (blogs) => (
  blogs.length === 0 ? null : _.head(_(blogs)
    .groupBy((blog) => blog.author)
    .entries()
    .maxBy(_.last, totalLikes))
)

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
