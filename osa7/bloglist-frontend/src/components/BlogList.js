import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = ({ user }) => {
  const byLikes = (b1, b2) => b2.likes - b1.likes

  const blogs = useSelector(state => state.blogs)

  return blogs ? (
    <div>
      {blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          own={user.username===blog.user.username}
        />
      )}
    </div>
  ) : null
}

export default BlogList