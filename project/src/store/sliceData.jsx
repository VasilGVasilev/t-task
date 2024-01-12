import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  status: 'idle',
  error: null
}

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await import('../../../DB/data.json')
  // .default, not .data  due to the DB being default export
  return response.default
})

export const counterSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    // no need for reducers, no data fetching
  },
  extraReducers(builder) {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.data = state.data.concat(action.payload)
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

// Action creators are generated for each case reducer function

export default counterSlice.reducer
