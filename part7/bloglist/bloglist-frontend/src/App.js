import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import {
  createNewBlog,
  setBlogs,
  removeBlog,
  likeBlog
} from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { login, setUser, logOut } from './reducers/userReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  useEffect(() => {
    blogService.getAll().then((result) => {
      dispatch(setBlogs(result.sort((a, b) => b.likes - a.likes)))
    })
  }, [dispatch])

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login(username, password))
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
            <button id="logout-button" onClick={() => dispatch(logOut())}>
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
