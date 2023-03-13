import { useState, useEffect, useRef } from 'react'
import Login from './components/Login'
import blogService from './services/blogs'
import {
  createNewBlog,
  setBlogs,
  removeBlog,
  likeBlog
} from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { login, setUser } from './reducers/userReducer'
import BlogList from './components/BlogList'
import Users from './components/Users'
import { Routes, Route } from 'react-router-dom'
import Notification from './components/Notification'
import { logOut } from './reducers/userReducer'

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
        <Login
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )}

      {user && (
        <div>
          <h2>blogs</h2>
          <Notification />
          <div>{user.name} logged in</div>
          <br />
          <button id="logout-button" onClick={() => dispatch(logOut())}>
            logout
          </button>
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route
              path="/"
              element={
                <BlogList
                  addBlog={addBlog}
                  blogFormRef={blogFormRef}
                  handleLike={handleLike}
                  deleteBlog={deleteBlog}
                />
              }
            />
          </Routes>
        </div>
      )}
    </>
  )
}

export default App
