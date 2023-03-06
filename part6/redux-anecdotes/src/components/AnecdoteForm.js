import { useDispatch } from 'react-redux'
import { hideNotification, showNotification } from '../reducers/notificationReducer'
import { newAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const addAnecdote = async (event) => {
    event.preventDefault()
    const text = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(newAnecdote(text))

    dispatch(showNotification( `you created an anecdote '${text}'` ))
    setTimeout (() => dispatch(hideNotification()), 5000)
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={ addAnecdote }>
        <div>
          <input name = 'anecdote' />
        </div>
        <button >create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
