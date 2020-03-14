import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postComment } from '../reducers/blogReducer.js'

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
      <form onSubmit={handleNewComment}>
        <div>
          <input
            id='content'
            value={content}
            onChange={({ target }) => setContent(target.value)}
          /><button id="create">post comment</button>
        </div>
      </form>
    </div>
  )
}

export default NewComment