
const Input =({ value, onChange, text, placeHolder }) => {
  return(
    <div>
      {text}
      <input
        value={value}
        onChange={onChange}
        type = { text === 'password' ? 'password' : null }
        placeholder = {placeHolder ? placeHolder : null}
      />
    </div>
  )
}

export default Input