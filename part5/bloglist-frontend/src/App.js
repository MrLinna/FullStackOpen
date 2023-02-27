import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [notificationMsg, setNotificationMsg] = useState(null)
  const blogFormRef = useRef()


  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
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
      setNotificationMsg(`wrong username or password`)
      setTimeout(() => {
        setNotificationMsg(null)
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    console.log('blogobject', blogObject)
    // Error: blogFormRef.current.toggleVisibility is not a function
    blogFormRef.current()//.toggleVisibility() //this works for some reason.
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        console.log('returned blog', returnedBlog)
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
        <Notification message={notificationMsg} msgColor = 'red'/>
        <LoginForm  handleLogin = {handleLogin} 
                    username = {username} setUsername = {setUsername} 
                    password = {password} setPassword = {setPassword}
                    />
      </>
      }

      {user && 
      
        <>
          <h2>blogs</h2>
          <Notification message={notificationMsg} msgColor = 'green'/>
          <p>
            {user.name} logged in
            <button onClick={logout}>logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref = {blogFormRef}>
            <BlogForm  CreateBlog = {addBlog}/>
          </Togglable>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </>
        
        
        
      }
      </>
    )
  
}



export default App

