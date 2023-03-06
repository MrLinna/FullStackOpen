import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import { setNotification } from './notificationReducer'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    
    updateAnecdote(state, action){
      //console.log('give a vote', JSON.parse(JSON.stringify(state)))
      const updated = action.payload
      return state.map( s => s.id !== updated.id ? s : updated).sort( (a,b) => b.votes - a.votes )
    },

    setAnecdotes(state, action){
      return action.payload.sort( (a,b) => b.votes - a.votes )
    },

    appendAnecdotes(state, action){
      state.push(action.payload)
    }


  }
})

export const { setAnecdotes, appendAnecdotes, updateAnecdote } = anecdoteSlice.actions

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
    dispatch(setNotification(`you ceated '${text}'`, 10))
  }
}

export const giveVote = (anecdoteToVote) => {
  return async dispatch => {
    const votedAnecdote = {...anecdoteToVote, votes: anecdoteToVote.votes + 1}
    const upDated = await anecdoteService.update(anecdoteToVote.id, votedAnecdote)
    dispatch(updateAnecdote(upDated))
    dispatch(setNotification(`you voted '${upDated.content}'`, 10))
  }
}

export default anecdoteSlice.reducer