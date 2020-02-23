import React from 'react'
import Blog from './Blog'

const Blogs = ({blogs, onLike}) => (
  <ul>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} onLike={onLike}/>
    )}
  </ul>
)

export default Blogs