import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer.js'
import { Form, Button } from 'react-bootstrap'

const NewBlog = ({ blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleNewBlog = async (event) => {
    try {
      event.preventDefault()

      dispatch(createBlog({
        title, author, url
      }))

      setTitle('')
      setAuthor('')
      setUrl('')
      blogFormRef.current.toggleVisibility()
    } catch(exception) {
      console.log(exception)
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={handleNewBlog}>
        <Form.Group>
          <Form.Label>author</Form.Label>
          <Form.Control
            type='text'
            name='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <Form.Label>title</Form.Label>
          <Form.Control
            type='text'
            name='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <Form.Label>url</Form.Label>
          <Form.Control
            type='text'
            name='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          <Button variant='primary' type='submit'>create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default NewBlog