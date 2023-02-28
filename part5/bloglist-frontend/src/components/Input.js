
const Input =({ value, onChange, text, placeHolder }) => {
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
          placeholder= {placeHolder ? placeHolder : <></>}
        />
      </div>
    )
  }
}

export default Input