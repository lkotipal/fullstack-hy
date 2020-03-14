import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postComment } from '../reducers/blogReducer.js'
import { Form, Button } from 'react-bootstrap'

const NewComment = ({ blog }) => {
  const [content, setContent] = useState('')

  const dispatch = useDispatch()

  const handleNewComment = async (event) => {
    try {
      event.preventDefault()

      console.log(blog)
      dispatch(postComment(blog, {
        content
      }))

      setContent('')
    } catch(exception) {
      console.log(exception)
    }
  }

  return (
    <div>
      <Form onSubmit={handleNewComment}>
        <Form.Group>
          <Form.Control
            name='content'
            type='text'
            value={content}
            onChange={({ target }) => setContent(target.value)}
          /><Button variant='primary' type='submit'>post comment</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default NewComment