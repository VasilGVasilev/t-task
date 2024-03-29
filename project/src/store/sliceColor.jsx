import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  colors: {},
  status: 'idle',
  error: null
}
export function fetchDataAPI() {
  return new Promise((resolve) =>
    setTimeout(() => resolve(import('../../../DB/colorOptions.json')), 500)
  );
}
export const fetchColors = createAsyncThunk('color/fetchColors', async () => {
  const response = await fetchDataAPI()
  // .default, not .data  due to the DB being default export
  return response.default
})


export const colorsSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {
    // no need for reducers, no data fetching
  },
  extraReducers(builder) {
    builder
      .addCase(fetchColors.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchColors.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.colors = {...action.payload}
      })
      .addCase(fetchColors.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

// Action creators are generated for each case reducer function

export default colorsSlice.reducer