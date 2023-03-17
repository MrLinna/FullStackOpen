import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'
import { useMutation } from '@apollo/client'
import { useState } from 'react'

const SetBirth = ({ authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [changeBornYear] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = (event) => {
    event.preventDefault()
    if (name !== '' && born !== '') {
      changeBornYear({ variables: { name, born } })
      setName('')
      setBorn('')
    }
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name{' '}
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((author) => (
              <option value={author.name} key={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born{' '}
          <input
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
            type="number"
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default SetBirth
