import blogService from './../services/blogs'
import commentService from './../services/comments'
import { updateUsers } from './usersReducer'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'UPDATE_BLOG':
    return state.map(blog => blog.id === action.data.id ? action.data : blog)
  case 'CREATE_BLOG':
    return state.concat(action.data)
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.data.id)
  case 'UPDATE_BLOGS':
    return action.data
  default:
    return state
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const editedBlog = await blogService.update({ ...blog, likes: blog.likes + 1 })
    dispatch({
      type: 'UPDATE_BLOG',
      data: editedBlog
    })
  }
}

export const postComment = (blog, comment) => {
  return async dispatch => {
    const postedComment = await commentService.create(blog.id, comment)
    const editedBlog = { ...blog, comment: blog.comments.concat(postedComment) }
    dispatch({
      type: 'UPDATE_BLOG',
      data: editedBlog
    })
    dispatch(updateBlogs())
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'CREATE_BLOG',
      data: newBlog
    })
    dispatch(updateUsers())
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog.id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: blog
    })
    dispatch(updateUsers())
  }
}

export const updateBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'UPDATE_BLOGS',
      data: blogs
    })
  }
}

export default reducer