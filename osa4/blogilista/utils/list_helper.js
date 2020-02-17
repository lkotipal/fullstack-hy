const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  const x = _.sumBy(blogs, 'likes')
  return x
}

const favoriteBlog = (blogs) => (
  blogs.length === 0 ? null : _.maxBy(blogs, 'likes')
)

// Fix it in post

const mostBlogs = (blogs) => {
  const mostBlogged = _(blogs)
    .countBy((blog) => blog.author)
    .entries()
    .maxBy(_.last)
  return mostBlogged ? {
    author: _.head(mostBlogged),
    blogs: _.tail(mostBlogged)[0],
  } : null
}

const mostLikes = (blogs) => {
  const authorsAndBlogs = _(blogs)
    .groupBy((blog) => blog.author)
    .entries()
    .value()
  const mostLiked = _.maxBy(authorsAndBlogs, (o) => totalLikes(_.last(o)))
  return mostLiked ? {
    author: _.head(mostLiked),
    likes: totalLikes(_.tail(mostLiked)[0]),
  } : null
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
