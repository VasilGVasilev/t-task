import dataLines from '../../../DB/data.json'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: dataLines,
}

export const counterSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    // no need for reducers, no data fetching
  },
})

// Action creators are generated for each case reducer function

export default counterSlice.reducer