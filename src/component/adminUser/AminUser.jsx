import { PlusOutlined, SearchOutlined, UploadOutlined } from "@ant-design/icons"
import TableComponent from "../tableComponent/TableComponent"
import React, { useEffect, useState } from 'react';
import { Button, Modal ,Form,Input,Checkbox, Upload, Space} from 'antd';
import { getBase64 } from "../../utils";
import { useMotationHooks } from "../../hooks/useMotationHook";
import * as productService from "../../service/ProductService"
import * as userService from "../../service/UserService"
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import mesage, { success } from "../../component/mesage /mesage"
import ModalComponent from "../modalComponent/ModalComponent";
import { useRef } from "react";
import Highlighter from 'react-highlight-words';
import { useSelector } from "react-redux";
import LoadingComponent from "../Loading/LoadingComponent";
function AdminUser(){
  
  const [form] = Form.useForm()
  const [isOpen , setIsOpen] =useState(false)
  const [rowSelected , setRowSelected] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenModalDelete , setIsOpenModalDelete] = useState(false)
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const user = useSelector(state=>state.user)
  console.log('stateUser',user.access_token)
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const [stateUsers, setStateUsers] = useState({
        name : '',
        email :'',
        isAmin :false,
        phone:'',
        address:''
    })
  const [detailStateUser , setDetailStateUser] = useState({
    name : '',
    email :'',
    isAmin :false,
    phone:'',
    address:''
  })
  useEffect(()=>{
    form.setFieldsValue(detailStateUser)
  },[form , detailStateUser])

    const renderAction =()=>{
        return (
            <div>
                <EditOutlined onClick={()=>setIsOpen(true)} className='mr-5 text-blue-400 hover:text-violet-600'/>
                <DeleteOutlined onClick={()=>setIsOpenModalDelete(true)} className='text-red-400 hover:text-red-600'/>
            </div>
        )
    }
    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div
          style={{
            padding: 8,
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: 'block',
            }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 90,
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{
                width: 90,
              }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({
                  closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              close
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? '#1677ff' : undefined,
          }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter 
            highlightStyle={{
              backgroundColor: '#ffc069',
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          render: (text) => <a>{text}</a>,
          ...getColumnSearchProps('name'),
        },
        {
          title: 'Email',
          dataIndex: 'email',
          ...getColumnSearchProps('email'),
        },
        {
            title: 'Admin',
            dataIndex: 'isAmin',
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          ...getColumnSearchProps('phone'),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            ...getColumnSearchProps('address'),
        },
        {
          title: 'Action',
          dataIndex: 'action',
          render : renderAction
        },
      ];
  const getDetailUser = async(id)=>{
        const res = await userService.getUser(id , user.access_token)
        //console.log("resss", res.product.name)
        if(res?.data){
          setDetailStateUser({
            name : res?.data?.name,
            email :res?.data?.email,
            isAmin:res?.data?.isAmin,
            phone:res?.data?.phone,
            address:res?.data?.address
          })
        }
        console.log("xxx",res)
  }
  
  const handleEditUser = ()=>{
    //setIsOpen(true)
    if(rowSelected){
      getDetailUser(rowSelected)
    }
    console.log( 'rowSelected',rowSelected)
  }
  useEffect(()=>{
    if(rowSelected){
      handleEditUser()
    }

  },[rowSelected])
  
  const handleOnChange =(e)=>{
        setStateUsers({
        ...stateUsers,
        [e.target.name]: e.target.value 
        })  
  }

  const handleOnChangeUserDetail =(e)=>{
    setDetailStateUser({
    ...detailStateUser,
    [e.target.name]: e.target.value 
    })  
}
  const mutation = useMotationHooks(
    (data)=>{
       const {name , email , isAmin, phone ,address } = data
       userService.createAcc({
        name ,
        email , 
        isAmin,
        phone,
        address
    })
    }
  )
  const mutationDetail = useMotationHooks(
    (data) =>{
      const {id , myData ,access_token}  = data
      const res = userService.updateUser(id ,myData , access_token)
      console.log("he" , res);
    }
  )
  const mutationDeleteUser = useMotationHooks(
    (data)=>{
      const {id  ,access_token} = data
      const res = userService.deleteUser(id , access_token)
      return res
    }
  )
  const mutationDeleteManyUser = useMotationHooks(
    (data)=>{
      const {ids  ,access_token} = data
      const res = userService.deleteManyUser(ids , access_token)
      return res
    }
  )
  let {isSuccess , isError} = mutationDetail
  const getAllUser =async()=>{
        const res = await userService.getAllUser()
        return res.data
  }
  const handleCloseDrawer =()=>{
    setIsOpen(false)
  }
  useEffect(()=>{
    if(isSuccess){
      success()
      handleCloseDrawer()
      isSuccess=false
    }
  },[isSuccess])
  const queryUser = useQuery({queryKey:['users'] ,queryFn :getAllUser})
  const {isLoading : isLoadingUser , data : users} = queryUser 
  console.log("usersss" , queryUser)
//   const handleOnChangeAvatart = async({fileList})=>{
//     const file =fileList[0]
//     if(!file.url && !file.preview){
//       file.preview = await getBase64(file.originFileObj )
//     }
//     setStateProduct({
//         ...stateProduct ,
//         image : file.preview
//     })
    
//   }
//   const handleOnChangeAvatartDetail = async({fileList})=>{
//     const file =fileList[0]
//     if(!file.url && !file.preview){
//       file.preview = await getBase64(file.originFileObj )
//     }
//     setDetailStateProduct({
//         ...detailStateProduct ,
//         image : file.preview
//     })
    
//   }
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = () => {
    mutation.mutate(stateUsers)
    console.log('Success:', stateUsers);
  };
  const onFinishDetail = () => {
  mutationDetail.mutate({id:rowSelected ,access_token: user.access_token ,  myData:detailStateUser} ,{
  onSettled: ()=>{
    queryUser.refetch()
  }}
  )
    console.log(mutationDetail);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const cancelModalDelete=()=>{
    setIsOpenModalDelete(false)
  }

  const onOkDeleteUser = ()=>{
    mutationDeleteUser.mutate({id : rowSelected , access_token:user.access_token},
      {
        onSettled :()=>{
          queryUser.refetch()
        }
      }
    )
    setIsOpenModalDelete(false)
  }
  const handleDeleteManyUser=(ids)=>{
        mutationDeleteManyUser.mutate({ids : ids , access_token : user.access_token},
              {
        onSettled :()=>{
          queryUser.refetch()
        }
      }

        )
  }
    return (
        <div>
           <div className="flex flex-col">
                Quan Li User
               <div className="p-10 m-4 border-2 w-[103px] border-sky-500 " onClick={showModal}> <PlusOutlined /></div>
           </div>
       <LoadingComponent isLoading={isLoadingUser}>
                <div >
    
                    <TableComponent handleDeleteManyProduct={handleDeleteManyUser}  columns={columns} products={users} onRow={(record , rowIs)=>{
                  return {
                    onClick: event=>{
                      setRowSelected(record._id)
                    }
                  }
                }} /></div>
       </LoadingComponent>
            <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Nhap San Pham" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
     <div className="mr-14">
        <Form 
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          onChange={handleOnChange}
          label="name"
          name="name"
          
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input  name="name" value={stateUsers.name}/>
        </Form.Item>
        {/* <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}
      
        <Form.Item
        onChange={handleOnChange}
          label="Email"
          name="email"
          
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input value={stateUsers.email} name="email"/>
        </Form.Item>  
        <Form.Item
        onChange={handleOnChange}
          label="Admin"
          name="isAmin"
          
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input name="isAmin" value={stateUsers.isAmin}/>
        </Form.Item>
        <Form.Item
        onChange={handleOnChange}
          label="Rating"
          name="rating"
          
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input name="phone" value={stateUsers.phone} />
        </Form.Item>
        {/* <Upload className="ml-36" onChange={handleOnChangeAvatart} maxCount={1}>
       <Button icon={<UploadOutlined/>}>SelectFile</Button>
        </Upload> */}
        <Form.Item
        onChange={handleOnChange}
          label="Type"
          name="type"
          
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input name="type" value={stateUsers.type}/>
        </Form.Item>  
   
        <Form.Item
        onChange={handleOnChange}
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button className="bg-blue-500" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
     </div>
      </Modal>
      <DrawerComponent onClose={()=>(setIsOpen(false))} isOpen={isOpen} >
      <Form 
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        // initialValues={{
        //   remember: true,
        // }}
        onFinish={onFinishDetail}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
        form={form}
      >
        <Form.Item
          onChange={handleOnChangeUserDetail}
          label="name"
          name="name"
          
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input  name="name" value={detailStateUser['name']}/>
        </Form.Item>
        <Form.Item
        onChange={handleOnChangeUserDetail}
          label="Email"
          name="email"
          
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input value={detailStateUser.email} name="email"/>
        </Form.Item>  
        {/* <Form.Item
        onChange={handleOnChangeUserDetail}
          label="isAdmin"
          name="isAdmin"
          
          rules={[
            {
              //required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input name="isAmin" value={detailStateUser.isAmin}/>
        </Form.Item> */}
        <Form.Item
        onChange={handleOnChangeUserDetail}
          label="Phone"
          name="phone"
          
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input name="phone" value={detailStateUser.phone} />
        </Form.Item>
        {/* <Upload className="ml-36" onChange={handleOnChangeAvatartDetail} maxCount={1}>
       <Button icon={<UploadOutlined/>}>SelectFile</Button>
        </Upload> */}
        <Form.Item
        onChange={handleOnChangeUserDetail}
          label="Address"
          name="address"
          
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input name="address" value={detailStateUser.address} />
        </Form.Item>

        <Form.Item
        onChange={handleOnChangeUserDetail}
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button className="bg-blue-500" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      </DrawerComponent>
      <ModalComponent isOpen={isOpenModalDelete} onCancel={cancelModalDelete} onOk={onOkDeleteUser}>Dám xoá không ?</ModalComponent>
        </div>
    )
}
export default AdminUser