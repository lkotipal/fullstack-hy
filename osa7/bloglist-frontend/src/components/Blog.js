import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useHistory } from 'react-router-dom'
import NewComment from './NewComment'
import { ListGroup, Button } from 'react-bootstrap'

const Blog = ({ blog }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLike = async () => {
    dispatch(likeBlog(blog))
  }

  const handleRemove = async () => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      history.push('/')
      dispatch(removeBlog(blog))
    }
  }

  return (
    <div>
      <h1>{blog.title} by {blog.author}</h1>
      <a href={blog.url}>{blog.url}</a>
      <div>likes {blog.likes}
        <Button onClick={handleLike}>like</Button>
      </div>
      <div>{blog.user.name}</div>
      {user.username===blog.user.username && <Button onClick={handleRemove}>remove</Button>}
      <h3>comments</h3>
      <NewComment blog={blog}/>
      <ListGroup>
        {blog.comments.map(comment => <ListGroup.Item key={comment.id}>{comment.content}</ListGroup.Item>)}
      </ListGroup>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
}

export default Blog