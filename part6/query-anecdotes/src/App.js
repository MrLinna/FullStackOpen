import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'

const App = () => {
  const queryClient = useQueryClient()
  
  const updateAnecdoteMutation = useMutation( updateAnecdote, { 
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    } 
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
  }


  const result = useQuery('anecdotes', getAnecdotes, { retry: false, refetchOnWindowFocus: false })
    
  if ( result.isLoading || result.isError){
    return <div>anecdote service note available due to problems in server</div>
  }

  const anecdotes = result.data.sort((a,b)=>b.votes-a.votes)

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
