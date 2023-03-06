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

    setAnecdotes(state, action){
      return action.payload
    },

    appendAnecdotes(state, action){
      state.push(action.payload)
    }

  }
})

export const { giveVote, setAnecdotes, appendAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const newAnecdote = text => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(text)
    dispatch(appendAnecdotes(newAnecdote))
    
  }
}

export default anecdoteSlice.reducer