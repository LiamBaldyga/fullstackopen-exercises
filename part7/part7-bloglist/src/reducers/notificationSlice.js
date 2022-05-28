import { createSlice } from '@reduxjs/toolkit'

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    notify: (state, action) => {
      return action.payload
    },
    reset: (state, action) => {
      return null
    },
  },
})

export const { notify, reset } = notificationSlice.actions

export const setMessage = (message) => {
  return async (dispatch) => {
    dispatch(notify(message))
    setTimeout(() => {
      dispatch(reset())
    }, 5000)
  }
}
export default notificationSlice.reducer
