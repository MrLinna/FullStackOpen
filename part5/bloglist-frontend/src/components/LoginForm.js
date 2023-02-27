
import Notification from "./Notification"
const LoginForm = ({handleLogin, username, setUsername, password, setPassword, notificationMsg, setNotificationMsg}) => {
  return(
    <>  
      <h2>Log in to application</h2>
      <Notification message={notificationMsg} msgColor = 'red'/>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type= "text"
            value= {username}
            name= "Username"
            onChange={({ target }) => setUsername(target.value)} />
        </div>

        <div>
          password
          <input
            type= "password"
            value= {password}
            name= "Password"
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        
        <button type="submit">login</button>
      </form>
    </> 
    )
  }

export default LoginForm