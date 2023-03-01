/* eslint-disable arrow-spacing */
import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMsg, setNotificationMsg] = useState(null)
  const blogFormRef = useRef()
  const [notificationColor, setNotificationColor] = useState('green')


  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs.sort((a,b) => b.likes - a.likes))
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (error) {
      setNotificationColor('red')
      setNotificationMsg('wrong username or password')
      setTimeout(() => {
        setNotificationMsg(null)
      }, 5000)
    }
  }

  const handleLike = async (id) => {
    const blogToUpdate = blogs.find(e => e.id === id)
    const likedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
    const updatedBlog = await blogService.update(id, likedBlog)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog).sort((a,b) => b.likes - a.likes))
  }

  const deleteBlog = async (id) => {
    const blogToDelete = blogs.find(b => b.id === id)
    if(window.confirm(`Remove blog '${blogToDelete.title}' by '${blogToDelete.author}'?`)) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter(b => b.id !== id).sort((a,b) => b.likes - a.likes))
        setNotificationColor('green')
        setNotificationMsg('blog deleted successfully')
        setTimeout(() => {
          setNotificationMsg(null)
        }, 5000)

      } catch (error) {
        setNotificationColor('red')
        setNotificationMsg('Something went wrong while deleting blog.')
        setTimeout(() => {
          setNotificationMsg(null)
        }, 5000)
      }

    }
  }


  const addBlog = (blogObject) => {
    console.log('blogobject', blogObject)
    // Error: blogFormRef.current.toggleVisibility is not a function
    blogFormRef.current()//.toggleVisibility() //this works for some reason.
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog).sort((a,b)=> b.likes - a.likes))
        console.log('returned blog', returnedBlog)
        setNotificationColor('green')
        setNotificationMsg(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setTimeout(() => {
          setNotificationMsg(null)
        }, 5000)
      })
  }
  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }
  return (
    <>
      {!user &&
      <>
        <h2>Log in to application</h2>
        <Notification message={notificationMsg} msgColor = {notificationColor}/>
        <LoginForm  handleLogin = {handleLogin}
          username = {username} setUsername = {setUsername}
          password = {password} setPassword = {setPassword}/>
      </>
      }

      {user &&

        <>
          <h2>blogs</h2>
          <Notification message={notificationMsg} msgColor = {notificationColor}/>
          <div>
            {user.name} logged in
            <button onClick={logout}>logout</button>
          </div>
          <Togglable buttonLabel="new blog" ref = {blogFormRef}>
            <BlogForm  CreateBlog = {addBlog}/>
          </Togglable>
          {blogs.map(blog => <Blog key = {blog.id} blog = {blog} handleLike = {handleLike} removeBlog = {deleteBlog} user = {user}/>)}
        </>
      }
    </>
  )

}



export default App

