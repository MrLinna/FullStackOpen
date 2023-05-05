import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient, useSubscription } from '@apollo/client'
import Recommend from './components/Recommend'
import { BOOK_ADDED, ALL_BOOKS } from './queries.js'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log(data)
      alert(`New book added: ${data.data.bookAdded.title}`)
    }
  })

  if (!token) {
    const tokenFromStorage = localStorage.getItem('library-user-token')
    if (tokenFromStorage) {
      setToken(tokenFromStorage)
    }
  }
  const logout = () => {
    setPage('authors')
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>

        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={() => logout()}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>
      <Notify errorMessage={errorMessage} />

      <Authors show={page === 'authors'} token={token !== null} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} setError={notify} />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setError={notify}
        setPage={setPage}
        message={notify}
      />
      <Recommend show={page === 'recommend'} />
    </div>
  )
}
const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }

  return <div style={{ color: 'red' }}>{errorMessage}</div>
}

export default App
