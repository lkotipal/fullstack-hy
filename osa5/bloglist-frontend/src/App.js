import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    async function getBlogs() {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')    
    if (loggedUserJSON) { 
      const user = JSON.parse(loggedUserJSON)      
      setUser(user)      
      blogService.setToken(user.token)
    }

    getBlogs()
  }, [])

  const notify = (message, type='success') => {
    setNotification({message, type})
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })


      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      setUser(user)
      blogService.setToken(user.token)
      notify('Login succeeded!')
    } catch (exception) {
      notify('Login failed!', 'error')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      setUser(null)
      window.localStorage.removeItem('loggedBlogappUser')
      notify('Logout succeeded!')
    } catch (exception) {
      notify('Logout failed!', 'error')
    }
  }

  const handlePost = async (event) => {
    event.preventDefault()

    try {
      const newBlog = await blogService.post({
        title, author, url
      })

      setBlogs(blogs.concat(newBlog))
      notify('Blog added!')
    } catch (exception) {
      notify('Post failed!', 'error')
    }
  }

  return user ?
    <div>
      <h2>Blogs</h2>
      <User name={user.name} onLogout={handleLogout}/>
      <Blogs blogs={blogs}/>
      <BlogForm
        title={title}
        author={author}
        url={url}
        setTitle={setTitle}
        setAuthor={setAuthor}
        setUrl={setUrl}
        onSubmit={handlePost}
      />
      <Notification notification={notification}/>
    </div>
    : <div>
      <LoginForm username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        onSubmit={handleLogin}
      />
      <Notification notification={notification}/>
    </div>
  }

export default App