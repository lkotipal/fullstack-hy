import blogService from './../services/blogs'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'UPDATE':
    return state.map(blog => blog.id === action.data.id ? action.data : blog)
  case 'NEW_ANECDOTE':
    return state.concat(action.data)
  case 'INIT_BLOGS':
    return action.data
  default:
    return state
  }
}

export const like = (blog) => {
  return async dispatch => {
    const editedBlog = await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 })
    dispatch({
      type: 'UPDATE',
      data: editedBlog
    })
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newBlog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default reducer