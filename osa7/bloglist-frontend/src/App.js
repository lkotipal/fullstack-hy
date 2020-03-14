import React, { useEffect } from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NavBar from './components/NavBar'
import {
  Switch, Route, useRouteMatch
} from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import BlogList from './components/BlogList'
import Users from './components/Users'
import { updateUsers } from './reducers/usersReducer'
import User from './components/User'

const App = () => {
  const blogFormRef = React.createRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(updateUsers())
  }, [dispatch])

  const loggedUser = useSelector(state => state.user)

  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)

  const blogMatch = useRouteMatch('/blogs/:id')
  const blog = blogMatch ? blogs.find(blog => blog.id === blogMatch.params.id) : null

  const userMatch = useRouteMatch('/users/:id')
  const user = userMatch ? users.find(user => user.id === userMatch.params.id) : null


  return loggedUser ? (
    <div>
      <NavBar />
      <h2>blogs</h2>

      <Notification />

      <Switch>
        <Route path='/blogs/:id'>
          {blog && <Blog blog={blog}/>}
        </Route>
        <Route path='/users/:id'>
          {user && <User user={user}/>}
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