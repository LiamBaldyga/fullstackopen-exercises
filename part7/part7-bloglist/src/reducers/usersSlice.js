import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

export const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    set: (state, action) => {
      return action.payload
    },
  },
})

export const { set } = usersSlice.actions

export const initializeUsers = () => {
  return async (disptach) => {
    const users = await userService.getAll()
    disptach(set(users))
  }
}

export default usersSlice.reducer
