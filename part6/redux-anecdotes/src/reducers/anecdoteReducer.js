import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    
    giveVote(state, action){
      //console.log('give a vote', JSON.parse(JSON.stringify(state)))
      return state.map( s => s.id !== action.payload ? s : {...s, votes: s.votes + 1 }).sort( (a,b) => b.votes - a.votes )
    },

    newAnecdote(state, action){
      state.push(action.payload)
    },

    setAnecdotes(state, action){
      return action.payload
    }

  }
})

export const { giveVote, newAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer