import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    search:''
}

export const userSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    searchProduct : (state , action)=>{
        state.search=action.payload
    } ,
  },
})

export const { searchProduct } = userSlice.actions

export default userSlice.reducer