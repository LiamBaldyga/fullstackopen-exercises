import { configureStore } from '@reduxjs/toolkit'
import blogSlice from './reducers/blogSlice'
import notificationSlice from './reducers/notificationSlice'
import userSlice from './reducers/userSlice'
import usersSlice from './reducers/usersSlice'

export const store = configureStore({
  reducer: {
    notification: notificationSlice,
    blogs: blogSlice,
    user: userSlice,
    users: usersSlice,
  },
})
