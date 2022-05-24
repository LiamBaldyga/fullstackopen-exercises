import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    notify(state, action) {
      return action.payload
    },
    resetNotification(state, action) {
      return null
    }
  }
})

export const { notify, resetNotification } = notificationSlice.actions

export const setNotification = (content, time) => {
  return async dispatch => {
    time = time * 1000
    dispatch(notify(content))
    setTimeout(() => {
      dispatch(resetNotification())
    }, time);
  }
}
export default notificationSlice.reducer