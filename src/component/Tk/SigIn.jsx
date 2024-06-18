import imgeee from '../../assets/25b2ccba8f33a5157f161b6a50f64a60.png'
import { useState } from 'react';
// import { useMutation } from '@tanstack/react-query';
// import axios from 'axios';
import { useMotationHooks } from '../../hooks/useMotationHook';
import * as userService from '../../service/UserService'
import  { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slice/couterSlice';
function SignIn() { 
    if(localStorage.getItem('access_token')){
        localStorage.removeItem('access_token')
        console.log('remove');
    }
    const location = useLocation()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
        console.log(email)
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value)
        console.log(password)
    }
    const mutation = useMotationHooks(
        data => userService.loginUser(data)
    )
    const {data , isLoading , isSuccess} = mutation 
    console.log('location' , location)
    useEffect(()=>{
        if(isSuccess){
            if(location?.state){
                navigate(location?.state)
            }
            else{
                navigate('/')
            }
            localStorage.setItem('access_token' , JSON.stringify(data.access_token))
            if(data?.access_token){
            const decoded = jwtDecode(data.access_token)
            console.log(decoded.payload.id); 
                if(decoded?.payload.id){
                    getUser(decoded.payload.id , data.access_token)
                }
            }
        }
        
    },[isSuccess])
    const clickMutation = () => {
        mutation.mutate({ email, password }) 
    }
    const getUser =async (id , access_token)=>{
        const res = await userService.getUser(id , access_token)
        dispatch(updateUser({...res?.data , access_token : access_token} ))
        console.log( "res", res);
    }
    return (
        <div className='flex ml-[600px] mt-[145px]'>
        <div className="h-[500px] shadow-lg  w-[442px] bg-slate-100">
           <div className='m-14'>
                <div className='font-extrabold text-2xl'>Xin Chào </div>
                <div className='mt-3 text-pretty'>Đăng Nhập Vào Tài Khoản </div>
                <div class="w-72">
                <div class="relative w-full min-w-[200px] mt-5 h-10">
    <input
      class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
      placeholder=" " value={email} onChange={handleChangeEmail} /><label
      class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Gmail
    </label>
                </div>
                </div>
                <div class="w-72">
                <div class="relative w-full min-w-[200px] mt-5 h-10">
    <input
      class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
      placeholder=" " value={password} onChange={handleChangePassword} /><label
      class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">PassWord
                            </label>
                </div>
                    </div>  
           <div className='mt-2'>
                        <button onClick={clickMutation} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
      Đăng Nhập
    </button>
           </div>
                <div className='mt-11 font-medium text-sky-500'>Quên Mật Khẩu</div>
            <div className='flex font-semibold mt-4'>
                <div>Chưa Có Tài Khoản chuaaa ?</div>
                <div className='text-sky-500 ml-6'>Tạo Tài Khoản</div>
            </div>
            </div>
           
        </div>
        <div className='h-[500px] shadow-lg  w-[300px] flex items-center   justify-center bg-slate-300'>
            <img className='w-[223px] h-[223px]' src={imgeee} alt='anhthoi' />
        </div>
    </div> );
}

export default SignIn;