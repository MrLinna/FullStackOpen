import LoginForm from './LoginForm'
import Notification from './Notification'

const Login = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword
}) => {
  return (
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
  )
}

export default Login
