import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import counterReducer from './slice/couterSlice'
import productSlide from './slice/productSlide'
import addOrderProduct from './slice/orderSlide'


const rootReducer = combineReducers({
  user : counterReducer,
  product : productSlide ,
  order : addOrderProduct
})

export const store = configureStore({
  reducer:rootReducer ,
})

