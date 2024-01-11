import { configureStore } from '@reduxjs/toolkit'
import dataReducer from '../store/sliceData'
import colorsReducer from '../store/sliceColor'


export const store = configureStore({
  reducer: {
    data: dataReducer,
    colors: colorsReducer,

  },
})