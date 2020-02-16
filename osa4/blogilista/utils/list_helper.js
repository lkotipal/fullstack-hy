// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((x, y) => x + y.likes, 0)

const favoriteBlog = (blogs) => blogs.reduce((x, y) => ((!x || y.likes > x.likes) ? y : x), null)

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
