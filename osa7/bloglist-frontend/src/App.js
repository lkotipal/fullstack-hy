import React, { useEffect } from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import UserInfo from './components/UserInfo'
import {
  Switch, Route, useRouteMatch
} from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import BlogList from './components/BlogList'
import Users from './components/Users'
import { updateUsers } from './reducers/usersReducer'

const App = () => {
  const blogFormRef = React.createRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(updateUsers())
  }, [dispatch])

  const user = useSelector(state => state.user)

  const blogs = useSelector(state => state.blogs)

  const match = useRouteMatch('/blogs/:id')
  const blog = match ? blogs.find(blog => blog.id === match.params.id) : null

  return user ? (
    <div>
      <h2>blogs</h2>

      <Notification />
      <UserInfo />

      <Switch>
        <Route path='/blogs/:id'>
          {blog && <Blog blog={blog}/>}
        </Route>
        <Route path='/users'>
          <Users/>
        </Route>
        <Route path='/'>
          <div>
            <Togglable buttonLabel='create new blog' ref={blogFormRef}>
              <NewBlog blogFormRef={blogFormRef}/>
            </Togglable>

            <BlogList />
          </div>
        </Route>
      </Switch>
    </div>
  ) : (
    <div>
      <h2>login to application</h2>
      <Notification />
      <LoginForm />
    </div>
  )
}

export default App