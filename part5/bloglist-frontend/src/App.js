import { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [notificationMsg, setNotificationMsg] = useState(null)


  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
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
        username, password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (error) {
      setNotificationMsg(`wrong username or password`)
      setTimeout(() => {
        setNotificationMsg(null)
      }, 5000)
      
    }
  }

    return (
      <>
      {!user && <LoginForm  handleLogin = {handleLogin} 
                            username = {username} setUsername = {setUsername} 
                            password = {password} setPassword = {setPassword}
                            notificationMsg={notificationMsg}/>
      }

      {user && <BlogForm  blogs = {blogs} 
                          setBlogs = {setBlogs} 
                          user = {user} 
                          setUser = {setUser}
                          notificationMsg={notificationMsg}
                          setNotificationMsg = {setNotificationMsg}/>
      }
      </>
    )
  
}



export default App


