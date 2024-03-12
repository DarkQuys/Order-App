import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slice/couterSlice'
export const store = configureStore({
  reducer:counterReducer,
})