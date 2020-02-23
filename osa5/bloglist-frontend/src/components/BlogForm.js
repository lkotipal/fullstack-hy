import React from 'react'

const BlogForm = ({ title, setTitle, author, setAuthor, url, setUrl, onSubmit }) => (
  <form onSubmit={onSubmit}>
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
)

export default BlogForm