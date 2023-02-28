
const Input =({ value, onChange, text }) => {
  if (text === 'password')
    return(
      <div>
        {text}
        <input
          value={value}
          onChange={onChange}
          type="password"
        />
      </div>
    )
  else{
    return(
      <div>
        {text}
        <input
          value={value}
          onChange={onChange}
        />
      </div>
    )
  }
}

export default Input