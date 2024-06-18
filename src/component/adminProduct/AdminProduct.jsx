import { PlusOutlined, SearchOutlined, UploadOutlined } from "@ant-design/icons"
import TableComponent from "../tableComponent/TableComponent"
import React, { useEffect, useState } from 'react';
import { Button, Modal ,Form,Input,Checkbox, Upload, Space, Select} from 'antd';
import { getBase64 } from "../../utils";
import { useMotationHooks } from "../../hooks/useMotationHook";
import * as productService from "../../service/ProductService"
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import mesage, { success } from "../../component/mesage /mesage"
import ModalComponent from "../modalComponent/ModalComponent";
import { useRef } from "react";
import Highlighter from 'react-highlight-words';
import { renderOption } from "../../utils";
function AdminProduct(){
  const [form] = Form.useForm()
  const [isOpen , setIsOpen] =useState(false)
  const [rowSelected , setRowSelected] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenModalDelete , setIsOpenModalDelete] = useState(false)
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [typeSelect, setTypeSelect] = useState('')
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getTypeProduct=async()=>{
    const res = await productService.getAllType()
    return res
  }
  const {data : typeProduct} = useQuery({queryKey:['allTypeProducts'] ,queryFn :getTypeProduct})
  console.log(typeProduct)
  const [stateProduct , setStateProduct] = useState({
        name : '',
        price :'',
        description:'',
        rating:'',
        image :'',
        type :'',
        countInStock :''
    })
  const [detailStateProduct , setDetailStateProduct] = useState({
    name : '',
    price :'',
    description:'',
    rating:'',
    image :'',
    type :'',
    countInStock :''
  })
  useEffect(()=>{
    form.setFieldsValue(detailStateProduct)
  },[form , detailStateProduct])

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
          title: 'Price',
          dataIndex: 'price',
          filters: [
            {
              text: '>1',
              value: '>=1',
            },
            {
              text: '<!',
              value: '<1',
            },
          
          ],
          
          onFilter:(value , record)=> {
            if(value === '>=1'){
              return Number(record.price)>=1
            }
            else if(value === '<1'){
              return Number(record.price)<1
            }
          },
         
        },
        {
          title: 'Type',
          dataIndex: 'type',
          ...getColumnSearchProps('name'),
        },
        {
          title: 'Rating',
          dataIndex: 'rating',
          filters: [
            {
              text: '>=3',
              value: '>=3',
            },
            {
              text: '<3',
              value: '<3',
            },
          
          ],
          onFilter:(value , record)=> {
            if(value === '>=3'){
              return Number(record.rating)>=1
            }
            else if(value === '<3'){
              return Number(record.rating)<1
            }
          },
         
        },
        {
          title: 'Action',
          dataIndex: 'action',
          render : renderAction
        },

      ];
  const getDetailProduct = async(id)=>{
        const res = await productService.getProductDetail(id)
        //console.log("resss", res.product.name)
        if(res?.product){
          setDetailStateProduct({
            name : res?.product?.name,
            price :res?.product?.price,
            description:res?.product?.description,
            rating:res?.product?.rating,
            image :res?.product?.image,
            type :res?.product?.type,
            countInStock :res?.product?.countInStock
          })
        }
        console.log("xxx",detailStateProduct)
  }
  
  const handleEditProduct = ()=>{
    //setIsOpen(true)
    if(rowSelected){
      getDetailProduct(rowSelected)
    }
    console.log( 'rowSelected',rowSelected)
  }
  useEffect(()=>{
    if(rowSelected){
      handleEditProduct()
    }

  },[rowSelected])
  
  const handleOnChange =(e)=>{
        setStateProduct({
        ...stateProduct,
        [e.target.name]: e.target.value 
        })  
  }

  const handleOnChangeProductDetail =(e)=>{
    setDetailStateProduct({
    ...detailStateProduct,
    [e.target.name]: e.target.value 
    })  
}
  const mutation = useMotationHooks(
    (data)=>{
       const {name , price ,description , rating , image ,type,countInStock } = data
       productService.createProduct({
        name ,
        price,
        description,
        rating,
        image,
        type,
        countInStock
    })
    }
  )
  const mutationDetail = useMotationHooks(
    (data) =>{
      const {id , myData}  = data
      const res = productService.updateProduct(id ,myData)
      console.log("he" , res);
    }
  )
  const mutationDeleteProduct = useMotationHooks(
    (data)=>{
      const res = productService.deleteProduct(data)
      return res
    }
  )
  const mutationDeleteManyProduct = useMotationHooks(
    (data)=>{
      const res = productService.deleteManyProduct(data)
      return res
    }
  )
  let {isSuccess , isError} = mutationDetail
  const getAllProduct =async()=>{
        const res = await productService.getAllProduct()
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
  const queryProduct = useQuery({queryKey:['products'] ,queryFn :getAllProduct})
  const {isLoading : isLoadingProducts , data : products} = queryProduct 
  console.log("product" ,products)
  const handleOnChangeAvatart = async({fileList})=>{
    const file =fileList[0]
    if(!file.url && !file.preview){
      file.preview = await getBase64(file.originFileObj )
    }
    setStateProduct({
        ...stateProduct ,
        image : file.preview
    })
    
  }
  const handleOnChangeAvatartDetail = async({fileList})=>{
    const file =fileList[0]
    if(!file.url && !file.preview){
      file.preview = await getBase64(file.originFileObj )
    }
    setDetailStateProduct({
        ...detailStateProduct ,
        image : file.preview
    })
    
  }
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
    mutation.mutate(stateProduct)
    setIsModalOpen(false)
    console.log('Success:', stateProduct);
  };
  const onFinishDetail = () => {
  mutationDetail.mutate({id:rowSelected , myData:detailStateProduct} ,{
  onSettled: ()=>{
    queryProduct.refetch()
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

  const onOkDeleteProduct = ()=>{
    mutationDeleteProduct.mutate(rowSelected , 
      {
        onSettled :()=>{
          queryProduct.refetch()
        }
      }
    )
    setIsOpenModalDelete(false)
  }
  const handleDeleteManyProduct=(ids)=>{
    mutationDeleteManyProduct.mutate(ids ,{
      onSettled :()=>{
        queryProduct.refetch()
      }
    })
  }
  const handleOnCheck = (value)=>{
    if(value!=='add_type'){
      setTypeSelect(value)
      setStateProduct(
        {
          ...stateProduct,
          type : value
        }
      )
    }
    console.log( 'select',value)
    setTypeSelect(value)
    
  }
  
    return (
        <div>
           <div className="flex flex-col">
                Quan Li San Pham
               <div className="p-10 m-4 border-2 w-[103px] border-sky-500 " onClick={showModal}> <PlusOutlined /></div>
           </div>
            <div className=""><TableComponent handleDeleteManyProduct={handleDeleteManyProduct} columns={columns} products={products} onRow={(record , rowIs)=>{
              return {
                onClick: event=>{
                  setRowSelected(record._id)
                }
              }
            }} /></div>
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
          <Input  name="name" value={stateProduct.name}/>
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
          label="Price"
          name="price"
          
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input value={stateProduct.price} name="price"/>
        </Form.Item>  
        <Form.Item
        onChange={handleOnChange}
          label="Description"
          name="description"
          
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input name="description" value={stateProduct.description}/>
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
          <Input name="rating" value={stateProduct.rating} />
        </Form.Item>
        <Form.Item
        onChange={handleOnChange}
          label="Image"
          name="image"
         
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
           <Upload style={{ width: 277 }} className="ml-36" onChange={handleOnChangeAvatart} maxCount={1}>
       <Button icon={<UploadOutlined/>}>SelectFile</Button>
        </Upload>
          
        </Form.Item>
     
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
              <Select
             
      defaultValue="Chose type"
      style={{ width: 277 }}
      onChange={handleOnCheck}
      name='type'
      options= {renderOption(typeProduct?.alltype)}
    /> 
        {typeSelect==='add_type'&&(<Input name="type" onChange={handleOnChange} value={stateProduct.type}/>)}

          
        </Form.Item>  
        <Form.Item
        onChange={handleOnChange}
          label="CountInStock"
          name="countInStock"
          
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input name="countInStock" value={stateProduct.countInStock}/>
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
          onChange={handleOnChangeProductDetail}
          label="name"
          name="name"
          
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input  name="name" value={detailStateProduct['name']}/>
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
        onChange={handleOnChangeProductDetail}
          label="Price"
          name="price"
          
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input value={detailStateProduct.price} name="price"/>
        </Form.Item>  
        <Form.Item
        onChange={handleOnChangeProductDetail}
          label="Description"
          name="description"
          
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input name="description" value={detailStateProduct.description}/>
        </Form.Item>
        <Form.Item
        onChange={handleOnChangeProductDetail}
          label="Rating"
          name="rating"
          
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input name="rating" value={detailStateProduct.rating} />
        </Form.Item>
        <Upload className="ml-36" onChange={handleOnChangeAvatartDetail} maxCount={1}>
       <Button icon={<UploadOutlined/>}>SelectFile</Button>
        </Upload>
        <Form.Item
        onChange={handleOnChangeProductDetail}
          label="Type"
          name="type"
          
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input name="type" value={detailStateProduct.type}/>
        </Form.Item>  
        <Form.Item
        onChange={handleOnChangeProductDetail}
          label="CountInStock"
          name="countInStock"
          
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input name="countInStock" value={detailStateProduct.countInStock}/>
        </Form.Item>  
        <Form.Item
        onChange={handleOnChangeProductDetail}
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
      <ModalComponent isOpen={isOpenModalDelete} onCancel={cancelModalDelete} onOk={onOkDeleteProduct}>Dám xoá không ?</ModalComponent>
        </div>
    )
}
export default AdminProduct