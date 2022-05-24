import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) {
      const content = action.payload
      state = content
      return state
    }
  }
})
export const { setFilter } = filterSlice.actions
export default filterSlice.reducer