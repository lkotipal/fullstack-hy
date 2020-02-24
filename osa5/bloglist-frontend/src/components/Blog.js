import React, { useState } from 'react'

const Blog = ({ blog, onLike, username, onRemove }) => {
  const [detailed, setDetailed] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetailed = () => {
    setDetailed(!detailed)
  }

  const deleteButton = () => (
    <button id='delete-blog' onClick={() => onRemove(blog)}>delete</button>
  )

  return detailed ?
    <li style={blogStyle}>
      {blog.title} by {blog.author} <button id='hide-blog' onClick={toggleDetailed}>hide</button><br/>
      {blog.url}<br/>
      Likes: {blog.likes} <button id='like-blog' onClick={() => onLike(blog)}>like</button><br/>
      {blog.user.name}<br/>
      {blog.user.username === username && deleteButton()}
    </li>
    : <li style={blogStyle}>
      {blog.title} by {blog.author} <button id='show-blog' onClick={toggleDetailed}>show</button>
    </li>
}

export default Blog
