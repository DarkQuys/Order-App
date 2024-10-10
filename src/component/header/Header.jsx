import { Badge } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { devUseWarning } from "antd/es/_util/warning";
import { Button, Popover, Space } from 'antd';
import * as userService from '../../service/UserService'
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/slice/couterSlice";
import { Spin } from 'antd'
import { useState } from "react";
import { useEffect } from "react";
import Search from "antd/es/input/Search";
import { searchProduct } from "../../redux/slice/productSlide";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";


function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const hehe = useSelector(state => state?.product)
    const [isLoading ,setIsLoading] = useState(false)
    const [userName , setUserName] = useState('')
    const [search , setSeacrch]=useState('')
    const user = useSelector((state)=>state?.user)
    console.log("uuu", user)
    const toSignIn = () => {
        navigate("/sign-in")
    }
    //console.log('user' , user)
    const logOutUser = ()=>{
        // const res =  await userService.logOutUser() 
        //dispatch(logOut())
        toSignIn()
    }
    const orderProduct = useSelector(state => state?.order?.orderItems?.length)
    console.log('oder',orderProduct)
    useEffect(()=>{
        setIsLoading(true)
        setUserName(user?.name)
        setIsLoading(false)
    }, [user?.name])
    console.log('xxxx',user)
    const content = (
        <div className="cursor-pointer">
          <p className="hover:bg-violet-200" onClick={logOutUser}>Log Out</p>
          <p className="hover:bg-violet-200" onClick={()=> navigate('/profile')}>Profile User</p>
          {user?.isAdmin ? (<p className="hover:bg-violet-200" onClick={()=>navigate("/system/admin")}>My Manager</p>) : undefined}
        </div>
      );
    const handleOnChangeSearch=(e)=>{
        console.log(e.target.value)
        setSeacrch(e.target.value)
    }
    const dispatchSearch=()=>{
        dispatch(searchProduct(search))
    }
    
    return ( 
        <div className="">
            <div className="flex text-sm items-center h-[75px] shadow-xl text-white grid grid-cols-4 gap-4 bg-violet-600">
                <div onClick={()=>navigate('/')} className="font-bold ml-4 cursor-pointer text-2xl pl-24">
                    DarkQuys
                </div>
                {/* <div className="flex rounded-lg pl-44 content-center items-center col-span-2 bg-white h-8 w-[80%]">
                    
                    <input type="text"  placeholder="Your Search" className="text-black w-[80%] pl-[20px]"/>
                    
                    <h1 className="opacity-25 text-black pl-2">Your Search</h1> 
                    <div className="bg-slate-500 flex items-center justify-center pb-1 pr-2 hover:bg-blue-700  w-32 h-8 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 text-black h-7 pb-1  pt-2  ">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </div> 
       
                </div> */}
               <div className=""> 
               <Search onSearch={dispatchSearch} onChange={handleOnChangeSearch} style={{
                 width: 700,
                 }} placeholder="Tìm Sản Phẩm" enterButton /></div>
                
                <div className="ml-[400px]">
               <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>  
                        {userName ? (
                            <>
                            <Spin spinning={isLoading}>
                       
                                
                              <Popover content={content} className="flex w-36 items-center" title="" trigger="click">
                                <img className="h-10 w-10 objectFit rounded-full" src={user.avatar}/>
                              <div className="cursor-pointer ml-2 w-20">{user.name}</div>
                              
                            </Popover>
                         
                        </Spin>
                        </>
                        ) : 

                        ( <div className="flex flex-row cursor-pointer  text-sm">
                            <UserOutlined className="mr-1"/>
                        <div onClick={toSignIn} className="w-20" >Đăng nhập</div>
                    </div>)
                        }
                      
                        <div onClick={()=>navigate('/order')} className="flex pl-3 items-center">
                     <Badge count={orderProduct}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
    </svg>
                     </Badge>
                            <div className="pl-2 w-20">Giỏ hàng</div>
                        </div>
               </div>

                </div>
            </div>
        </div>
     );
}
export default Header
