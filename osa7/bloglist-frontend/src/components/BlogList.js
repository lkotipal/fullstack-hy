import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const BlogList = () => {
  const byLikes = (b1, b2) => b2.likes - b1.likes

  const blogs = useSelector(state => state.blogs)

  return blogs ? (
    <ListGroup>
      {blogs.sort(byLikes).map(blog =>
        <ListGroup.Item key={blog.id}>
          <Link to={`blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
        </ListGroup.Item>
      )}
    </ListGroup>
  ) : null
}

export default BlogList