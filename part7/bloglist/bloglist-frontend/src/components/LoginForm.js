import PropTypes from 'prop-types'
import Input from './Input'
import { FaChevronRight } from 'react-icons/fa'
const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword
}) => {
  return (
    <>
      <form className="login" onSubmit={handleLogin}>
        <h1>Welcome to Blog App</h1>
        <Input
          text="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          ID="username"
          placeholder="Password"
        />

        <Input
          text="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          ID="password"
        />
        <button
          className="button login__submit"
          type="submit"
          id="login-button"
        >
          <span className="button__text">Log In</span>
          <FaChevronRight className="button__icon" />
        </button>
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
