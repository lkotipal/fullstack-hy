import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const byLikes = (b1, b2) => b2.likes - b1.likes

  const blogs = useSelector(state => state.blogs)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return blogs ? (
    <div>
      {blogs.sort(byLikes).map(blog =>
        <div key={blog.id} style={blogStyle} className='blog'>
          <Link to={`blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
        </div>
      )}
    </div>
  ) : null
}

export default BlogList