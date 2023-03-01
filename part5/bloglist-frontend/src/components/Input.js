
const Input =({ value, onChange, text, placeHolder, ID }) => {
  return(
    <div>
      {text}
      <input
        value={value}
        onChange={onChange}
        type = { text === 'password' ? 'password' : null }
        placeholder = {placeHolder ? placeHolder : null}
        id = {ID ? ID : null}
      />
    </div>
  )
}

export default Input