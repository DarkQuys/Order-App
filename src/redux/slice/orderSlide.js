import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderItems :[]
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrderProduct : (state , action)=>{
        const {orderItem} =action.payload
        const itemOrder = state?.orderItems?.find((item)=> item?.product===orderItem?.product)
        if(itemOrder){
            itemOrder.amount += orderItem?.amount
        }
        else{
            state.orderItems.push(orderItem)
        }
    } ,
    deleteOrDerProduct :(state , action)=>{
      const {idProduct} = action.payload 
      console.log(action.payload)
      const itemOrder = state?.orderItems?.filter((item)=>(item?.product !== idProduct))
      state.orderItems=itemOrder
    }
  },
})

export const { addOrderProduct , deleteOrDerProduct } = orderSlice.actions

export default orderSlice.reducer