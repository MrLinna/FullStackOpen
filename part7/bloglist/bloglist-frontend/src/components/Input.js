import { FaLock, FaUser } from 'react-icons/fa'
const Input = ({ value, onChange, text, placeHolder, ID }) => {
  if (text === 'username') {
    return (
      <div className="login__field">
        <FaUser className="login__icon fas fa-user" />
        <input
          value={value}
          onChange={onChange}
          id={ID ? ID : null}
          type="text"
          className="login__input"
          placeholder="User name / Email"
        ></input>
      </div>
    )
  } else if (text === 'password') {
    return (
      <div className="login__field">
        <FaLock className="login__icon fas fa-lock" />
        <input
          value={value}
          onChange={onChange}
          id={ID ? ID : null}
          type="password"
          className="login__input"
          placeholder="Password"
        ></input>
      </div>
    )
  }
  return (
    <div>
      {text}
      <input
        value={value}
        onChange={onChange}
        placeholder={placeHolder ? placeHolder : null}
        id={ID ? ID : null}
      />
    </div>
  )
}

export default Input
