import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnec = content => {
  return async dispatch => {
    const newAnec = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnec))
  }
}

export const vote = id => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const anecToChange = anecdotes.find(a => a.id === id)
    const newAnec = {
      ...anecToChange,
      votes: anecToChange.votes + 1
    }
    await anecdoteService.vote(id, newAnec)
    const newAnecdotes = anecdotes.map(anec =>
      anec.id !== id ? anec : newAnec)
    dispatch(setAnecdotes(newAnecdotes))
  }
}

export default anecdoteSlice.reducer