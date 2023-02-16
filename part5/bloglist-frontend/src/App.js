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


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
    }
  }

    return (
      <>
      {!user && <LoginForm  handleLogin = {handleLogin} 
                            username = {username} 
                            setUsername = {setUsername} 
                            password = {password} 
                            setPassword = {setPassword}/>
      }

      {user && <BlogForm blogs = {blogs} user ={user}/>}
      </>
    )
  
}



export default App


