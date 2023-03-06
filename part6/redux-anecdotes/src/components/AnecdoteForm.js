
import { newAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addAnecdote = (event) => {
    event.preventDefault()
    const text = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(newAnecdote(text))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={ addAnecdote }>
        <div><input name = 'anecdote' /></div>
        <button >create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm