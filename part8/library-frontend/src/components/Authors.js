import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'
import { useQuery, useMutation } from '@apollo/client'
import { useState } from 'react'

const SetBirth = () => {
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
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
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

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  const authors = result.data.allAuthors || []

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SetBirth />
    </div>
  )
}

export default Authors
