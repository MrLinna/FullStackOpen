import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import {
  createNewBlog,
  setBlogs,
  removeBlog,
  likeBlog
} from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    blogService.getAll().then((result) => {
      dispatch(setBlogs(result.sort((a, b) => b.likes - a.likes)))
    })
  }, [dispatch])

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
        username,
        password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (error) {
      dispatch(setNotification('wrong username or password', 'red', 5))
    }
  }

  const handleLike = async (id) => {
    const blogToUpdate = blogs.find((e) => e.id === id)
    dispatch(likeBlog(blogToUpdate))
  }

  const deleteBlog = async (id) => {
    const blogToDelete = blogs.find((b) => b.id === id)
    const confirmDelete = window.confirm(
      `Remove blog '${blogToDelete.title}' by '${blogToDelete.author}'?`
    )
    if (confirmDelete) {
      dispatch(removeBlog(blogToDelete))
    }
  }

  const addBlog = async (blogObject) => {
    // Error: blogFormRef.current.toggleVisibility is not a function
    blogFormRef.current() //.toggleVisibility() //this works for some reason.
    dispatch(createNewBlog(blogObject))
  }
  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }
  return (
    <>
      {!user && (
        <>
          <h2>Log in to application</h2>
          <Notification />
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </>
      )}

      {user && (
        <>
          <h2>blogs</h2>
          <Notification />
          <div>
            {user.name} logged in
            <button id="logout-button" onClick={logout}>
              logout
            </button>
          </div>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm CreateBlog={addBlog} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              removeBlog={deleteBlog}
              user={user}
            />
          ))}
        </>
      )}
    </>
  )
}

export default App
