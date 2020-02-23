import React from 'react'
import Blog from './Blog'

const Blogs = ({blogs, onLike, username, onRemove}) => {
  return(
  <ul>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} onLike={onLike} username={username} onRemove={onRemove}/>
    )}
  </ul>
)}

export default Blogs