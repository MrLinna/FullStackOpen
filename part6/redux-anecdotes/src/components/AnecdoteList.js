import { giveVote } from '../reducers/anecdoteReducer'
import { hideNotification, showNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'


const Anecdote = ({ id, content, votes, handleClick }) => {
    return(
        <div key={ id }>
            <div>
                { content }
            </div>
            <div>
                has { votes }
                <button onClick={ handleClick }>vote</button>
            </div>
        </div> 
    )
}


const AnecdoteList = () => {
    const dispatch = useDispatch()
    const filteredAnecdotes = useSelector(({ filter, anecdotes }) => {
        return filter === '' ?  anecdotes : anecdotes.filter( a => a.content.toLowerCase().includes(filter.toLowerCase()) )
      })
    const handleClick = (id, text) => {
        dispatch(giveVote(id))
        dispatch(showNotification( `you voted '${text}'` ))
        setTimeout (() => dispatch(hideNotification()), 5000)

        
    }
    return(
    <div>
        {filteredAnecdotes.map(each =>
            <Anecdote 
                key = {each.id}
                id = {each.id}
                content = {each.content}
                votes = {each.votes}
                handleClick = {() => handleClick(each.id, each.content)}
            />
        )}
    </div>
    )
}


export default AnecdoteList


