import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    async function getBlogs() {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')    
    if (loggedUserJSON) { 
      const user = JSON.parse(loggedUserJSON)      
      setUser(user)      
    }

    getBlogs()
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })


      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('login failed')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging out')

    try {
      setUser(null)
      setUsername('')
      setPassword('')

      window.localStorage.removeItem('loggedBlogappUser')

    } catch (exception) {
      console.log('logout failed')
    }
  }

  return user ?
    <div>
      <User name={user.name} onLogout={handleLogout}/>
      <Blogs blogs={blogs} />
    </div>
    : <div>
      <LoginForm username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        onSubmit={handleLogin} />
    </div>
  }

export default App