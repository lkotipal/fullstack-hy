import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer.js'

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
      <form onSubmit={handleNewBlog}>
        <div>
          author
          <input
            id='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          title
          <input
            id='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          url
          <input
            id='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create">create</button>
      </form>
    </div>
  )
}

export default NewBlog