import React, {useState} from 'react'
import Button from './Button'

const Blog = ({blog, onLike}) => {
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
  
  return detailed ? 
  <li style={blogStyle}>
    {blog.title} by {blog.author} <Button text='hide' onAction={toggleDetailed}/><br/>
    {blog.url}<br/>
    Likes: {blog.likes} <Button text='like' onAction={() => onLike(blog)}/><br/>
    {blog.user.name}<br/>
  </li>
  : <li style={blogStyle}>
    {blog.title} by {blog.author} <Button text='show' onAction={toggleDetailed}/>
  </li>
}

export default Blog
