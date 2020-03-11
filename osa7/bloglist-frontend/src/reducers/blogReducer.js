import blogService from './../services/blogs'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'UPDATE':
    return state.map(blog => blog.id === action.data.id ? action.data : blog)
  case 'CREATE':
    return state.concat(action.data)
  case 'REMOVE':
    return state.filter(blog => blog.id !== action.data.id)
  case 'INIT':
    return action.data
  default:
    return state
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const editedBlog = await blogService.update({ ...blog, likes: blog.likes + 1 })
    dispatch({
      type: 'UPDATE',
      data: editedBlog
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'CREATE',
      data: newBlog
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog.id)
    dispatch({
      type: 'REMOVE',
      data: blog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs
    })
  }
}

export default reducer