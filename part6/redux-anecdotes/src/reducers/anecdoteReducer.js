import { createSlice } from '@reduxjs/toolkit'

/*const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)
const initialState = anecdotesAtStart.map(asObject)
*/
const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0
  }
}
const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    
    giveVote(state, action){
      //console.log('give a vote', JSON.parse(JSON.stringify(state)))
      return state.map( s => s.id !== action.payload ? s : {...s, votes: s.votes + 1 }).sort( (a,b) => b.votes - a.votes )
    },

    newAnecdote(state, action){
      return [...state, asObject(action.payload)].sort( (a,b) => b.votes - a.votes)
    },

    setAnecdotes(state, action){
      return action.payload
    }

  }
})

export const { giveVote, newAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer