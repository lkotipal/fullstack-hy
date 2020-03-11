import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './Blog'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const BlogList = () => {
  const dispatch = useDispatch()
  const byLikes = (b1, b2) => b2.likes - b1.likes

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    dispatch(likeBlog(blogToLike))
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      dispatch(removeBlog(blogToRemove))
    }
  }

  return blogs ? (
    <div>
      {blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          own={user.username===blog.user.username}
          handleLike={handleLike}
          handleRemove={handleRemove}
        />
      )}
    </div>
  ) : null
}

export default BlogList