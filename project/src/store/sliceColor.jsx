import colorOptions from '../../../DB/colorOptions.json'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: colorOptions,
}

export const counterSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {
    // no need for reducers, no data fetching
  },
})

// Action creators are generated for each case reducer function

export default counterSlice.reducer