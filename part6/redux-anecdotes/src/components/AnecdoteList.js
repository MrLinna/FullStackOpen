import { giveVote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'


const Anecdote = ({ id, content, votes, handleClick }) => {
    return(
        <div key={id}>
            <div>
                {content}
            </div>
            <div>
                has {votes}
                <button onClick={() => handleClick }>vote</button>
            </div>
        </div> 
    )
}


const AnecdoteList = () => {
    const dispatch = useDispatch()
    const filteredAnecdotes = useSelector(({ filter, anecdotes }) => {
        return filter === '' ?  anecdotes : anecdotes.filter( a => a.content.toLowerCase().includes(filter.toLowerCase()) )
      })
  
    return(  
    <div>
        {filteredAnecdotes.map(anecdote =>
            <Anecdote 
                key={anecdote.id}
                id = {anecdote.id}
                content = {anecdote.content}
                votes={anecdote.votes}
                handleClick = {()=> dispatch(giveVote(anecdote.id))}
            />
        )}
    </div>
    )
}


export default AnecdoteList


