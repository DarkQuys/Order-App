import axios from "axios"

export const getAllProduct = async(search ,limit)=>{
    let res ={}
    if(search?.length){
         res = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/getallproduct?filter=name&filter=${search}&limit=${limit}`)
    }
    else{
         res = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/getallproduct?limit=${limit}`)
    }
  
    return res.data
}
export const getProductFromType = async(search ,page,limit)=>{
    // let res ={}
    // if(search?.length){
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/getallproduct?filter=type&filter=${search}&limit=${limit}&page=${page}`)
    
    // else{
    //      res = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/getallproduct?limit=${limit}`)
    // }
  
    return res.data
}
export const getAllType = async()=>{
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/get-all-type`)
    return res.data
}

export const createProduct = async(data)=>{
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/product/createproduct`,data)
    return res.data
}
export const getProductDetail =async(id)=>{
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/getproduct/${id}`)
    return res.data
}
export const updateProduct =async(id ,data)=>{
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/product/updateproduct/${id}`,data)
    return res.data
} 

export const deleteProduct =async(id)=>{
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/product/deleteproduct/${id}`)
    return res.data
} 
export const deleteManyProduct =async(ids)=>{
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/product/delete-many`,ids)
    return res.data
} 