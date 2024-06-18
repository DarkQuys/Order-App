import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id : '' ,
    name : '' ,
    email : '' ,
    phone :'' ,
    address : '',
    avatar :'',
    access_token : '' ,
    ísAmin : false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser : (state , action)=>{
      const { name ='',email='' ,phone ='', address ='' ,avatar ='',_id='' , access_token ='' ,isAmin } = action.payload
      state.name = name
      state.email =email
      state.phone = phone 
      state.address = address
      state.avatar= avatar 
      state.id = _id 
      state.access_token = access_token
      state.isAdmin = isAmin
    } ,
    logOut :(state)=>{
      state.name = ''
      state.email =''
      state.phone = '' 
      state.address = ''
      state.avatar= '' 
      state.id = ''
      state.access_token = ''
      state.isAdmin = false
    }
  },
})

export const { updateUser, logOut } = userSlice.actions

export default userSlice.reducer