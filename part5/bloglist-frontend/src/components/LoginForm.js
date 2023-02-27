
import Input from "./Input"
const LoginForm = ({handleLogin, username, setUsername, password, setPassword}) => {
  return(
    <>  

      <form onSubmit={handleLogin}>
        <Input text = "username" value = {username} onChange={({ target }) => setUsername(target.value)}/>
        <Input text = "password" value = {password} onChange={({ target }) => setPassword(target.value)}/>
        <button type="submit">login</button>
      </form>
    </> 
    )
  }

export default LoginForm