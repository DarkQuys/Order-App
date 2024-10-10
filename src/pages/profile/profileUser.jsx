import { useSelector } from "react-redux"
import { useState } from "react"
import { useEffect } from "react"
import { useMotationHooks } from "../../hooks/useMotationHook"
import * as userService from '../../service/UserService'
import { useDispatch } from "react-redux"
import {updateUser}  from "../../redux/slice/couterSlice"
import * as mesage from "../../component/mesage /mesage"
import { Button , Upload } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { getBase64 } from "../../utils"


function ProfileUser(){ 
    const dispatch = useDispatch()
    const user = useSelector((state)=>state.user)
    console.log(user)
    const [email , setEmail] = useState('')
    const [name , setName] = useState('')
    const [phone , setPhone] = useState('')
    const [address , setAddress] = useState('')
    const [avatar , setAvatar] = useState('')

    const mutation = useMotationHooks(
      (data) => {
        const {id , access_token ,...rest} = data 
        userService.updateUser(id , rest , access_token )
      }
    )
    console.log('mutation',mutation)
    const {isSuccess , isError} = mutation
    useEffect(()=>{
      setEmail(user.email)
      setName(user.name)
      setPhone(user.phone)
      setAddress(user.address)
      setAvatar(user.avatar)
  },[user])
    useEffect(()=>{
      if(isSuccess){
        mesage.success()
        getUser(user?.id ,user?.access_token)
      } else if(isError){
        mesage.error()
      }

    },[isSuccess , isError])
    
    const handleOnChangeEmail = (e)=>{
        setEmail(e.target.value)
    }
    const handleOnChangeName= (e)=>{
      setName(e.target.value)
    }
    const handleOnChangeAddress = (e)=>{
    setAddress(e.target.value)
    }
    const handleOnChangePhone = (e)=>{
    setPhone(e.target.value)
    }
    const handleOnChangeAvatart = async({fileList})=>{
      const file =fileList[0]
      if(!file.url && !file.preview){
        file.preview = await getBase64(file.originFileObj )
      }
      console.log('file',file.preview);
      setAvatar(file.preview)
    }
    const getUser = async(id , access_token)=>{
      const res = await userService.getUser(id ,access_token)
      console.log( 'ress',res)
      dispatch(updateUser(res.data))
    }
    

    const handleUpdateUser = async()=>{
         mutation.mutate({ id :user?.id , name , email , phone , address , avatar, access_token : user?.access_token})
    }
    return (
        <div className="pt-8 flex justify-center">
          <form class="w-full max-w-sm">
    <div class="flex items-center border-b border-teal-500 py-2">
      <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" value={email} onChange={handleOnChangeEmail} type="text" placeholder="" aria-label="Full name"/>
      <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
        Sign Up
      </button>
      <button class="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
        Cancel
      </button>
    </div>
    <div class="flex items-center border-b border-teal-500 py-2">
      <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" onChange={handleOnChangeName} value={name} placeholder="" aria-label="Full name"/>
      <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
        Sign Up
      </button>
      <button class="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
        Cancel
      </button>
    </div>
    <div class="flex items-center border-b border-teal-500 py-2">
      <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" value={address} onChange={handleOnChangeAddress} placeholder="" aria-label="Full name"/>
      <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
        Sign Up
      </button>
      <button class="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
        Cancel
      </button>
    </div>
    <div class="flex items-center border-b border-teal-500 py-2">
      <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" value={phone} onChange={handleOnChangePhone} placeholder="" aria-label="Full name"/>
      <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
        Sign Up
      </button>
      <button class="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
        Cancel
      </button>
    </div>
    <div>Your Avatar</div>
    <Upload onChange={handleOnChangeAvatart} maxCount={1}>
      <Button icon={<UploadOutlined/>}>SelectFile</Button>
    </Upload>
    {avatar && (<img src={avatar} style={{
      height : '60px' ,
      width: '60px' ,
      borderRadius : '50%',
      objectFit : 'cover'
  
    }} alt="avatar"/>)}
    <div class="flex items-center border-b border-teal-500 py-2">
      <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text"  placeholder="" aria-label="Full name"/>
      <button onClick={handleUpdateUser} class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
        UPDATE
      </button>
      <button class="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
        Cancel
      </button>
    </div>
  </form>    
        </div>
    )
}

export default ProfileUser