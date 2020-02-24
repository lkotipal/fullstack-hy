import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = React.createRef()

  useEffect(() => {
    async function getBlogs() {
      const blogs = await blogService.getAll()
      blogs.sort((a, b) => b.likes - a.likes)
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
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async credentials => {
    try {
      const user = await loginService.login(credentials)
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

  const handlePost = async (blog) => {
    blogFormRef.current.toggleVisibility()

    try {
      const newBlog = await blogService.post(blog)
      setBlogs(blogs.concat(newBlog))
      notify('Blog posted!')
    } catch (exception) {
      notify('Post failed!', 'error')
    }
  }

  const handleLike = async (blog) => {
    const likedBlog = { likes: blog.likes + 1 }
    try {
      const updatedBlog = await blogService.update(blog.id, likedBlog)
      const newBlogs = blogs.map((blog) => blog.id === updatedBlog.id ? { ...blog, likes: updatedBlog.likes } : blog)
      newBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(newBlogs)
      notify('Blog liked!')
    } catch (exception) {
      notify('Like failed!', 'error')
    }
  }

  const handleRemove = async (removedBlog) => {
    if (window.confirm(`Are you sure you want to remove ${removedBlog.title} by ${removedBlog.author}?`))
      try {
        await blogService.remove(removedBlog.id)
        setBlogs(blogs.filter((blog) => (blog.id !== removedBlog.id)))
        notify('Blog removed!')
      } catch (exception) {
        notify('Remove failed!', 'error')
      }
  }

  return user ?
    <div>
      <h2>Blogs</h2>
      <User name={user.name} onLogout={handleLogout}/>
      <Blogs id='blog-view' blogs={blogs} onLike={handleLike} username={user.username} onRemove={handleRemove}/>
      <Togglable buttonLabel={'Post blog'} ref={blogFormRef}>
        <BlogForm postBlog={handlePost}/>
      </Togglable>
      <Notification notification={notification}/>
    </div>
    : <div>
      <LoginForm login={handleLogin}/>
      <Notification notification={notification}/>
    </div>
}

export default App