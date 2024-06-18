import axios from "axios"
export const axiosJWT = axios.create()
export const loginUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/loginuser`, data)
    return res.data
}

export const createAcc = async (data)=>{
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/createuser`,data)
    return res.data
}
export const getUser = async(id , access_token)=>{
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/getuser/${id}` ,{
        headers :{
            token :`Bearer ${access_token}`,
        }
    })
    return res.data
}
export const getAllUser =async()=>{
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/getalluser`)
    return res.data
}
export const refresh_token = async()=>{
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/refresh`,{
        withCredentials : true
    })
    return res.data
}
export const logOutUser = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/logout`)
    return res.data
}
export const updateUser = async(id , data , access_token)=>{
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/updateuser/${id}` ,data ,{
        headers : {
            token : `Bearer ${access_token}`
        }
    })
    return res.data
}
export const deleteUser = async(id , access_token)=>{
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/deleteuser/${id}`,{
        headers : {
            token : `Bearer ${access_token}`
        }
    })
    return res.data
}
export const deleteManyUser = async(ids , access_token)=>{
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/delete-many`,ids,{
        headers : {
            token : `Bearer ${access_token}`
        }
    })
    return res.data
}
