import React, {useState} from 'react'

const BlogForm = ({postBlog}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  
  const addBlog = (event) => {
    event.preventDefault()

    postBlog({
      title, author, url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
  <form onSubmit={addBlog}>
    <table><tbody>
      <tr>
        <td>Title</td>
        <td><input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        /></td>
      </tr>
      <tr>
        <td>Author</td>
        <td><input
          type="author"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        /></td>
      </tr>
      <tr>
        <td>URL</td>
        <td><input
          type="text"
          value={url}
          name="URL"
          onChange={({ target }) => setUrl(target.value)}
        /></td>
      </tr>
    </tbody></table>
    <button type="submit">post</button>
  </form>
)}

export default BlogForm