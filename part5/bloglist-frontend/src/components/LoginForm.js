import PropTypes from 'prop-types'
import Input from './Input'
const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => {
  return(
    <>
      <form onSubmit={handleLogin}>
        <Input text = "username" value = {username} onChange={({ target }) => setUsername(target.value)} ID = 'username'/>
        <Input text = "password" value = {password} onChange={({ target }) => setPassword(target.value)} ID = 'password'/>
        <button type="submit" id = 'login-button'>login</button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm