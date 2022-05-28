import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { setMessage } from '../reducers/notificationSlice'
import userService from '../services/user'

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    set: (state, action) => {
      return action.payload
    },
  },
})
export const { set } = userSlice.actions

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const loggedUser = await loginService.login({
        username,
        password,
      })
      userService.setUser(loggedUser)
      dispatch(set(loggedUser))
      dispatch(setMessage('Login Successful'))
    } catch (e) {
      dispatch(setMessage('wrong username/password'))
    }
  }
}

export const logOut = () => {
  return async (dispatch) => {
    userService.clearUser()
    dispatch(set(null))
    dispatch(setMessage('Good bye!'))
  }
}

export const initializeUser = () => {
  return async (dispatch) => {
    const user = userService.getUser()
    dispatch(set(user))
  }
}

export default userSlice.reducer
