import React, { useEffect } from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import LoginForm from './components/LoginForm'
import User from './components/User'
import {
  BrowserRouter as Router,  Switch, Route, Link
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

  return user ? (
    <Router>
      <h2>blogs</h2>

      <Notification />
      <User />

      <Switch>
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
    </Router>
  ) : (
    <div>
      <h2>login to application</h2>
      <Notification />
      <LoginForm />
    </div>
  )
}

export default App