
import Image1 from '../../assets/fe77cababd0fe575333a17ef5432dabb.jpg.webp'
import { Rate } from 'antd';
import { InputNumber } from 'antd';
import * as productService from '../../service/ProductService'
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addOrderProduct } from '../../redux/slice/orderSlide';
import { useState } from 'react';
import {Spin} from 'antd';


function ProductComponent({idProduct}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [numProduct , setNumProduct] = useState()
    const [delay , setDelay] = useState()
    const location =useLocation()
    const user = useSelector(state=> state.user)
    const orrder = useSelector(state=>state.order)
    console.log('orrder',orrder)
    const onChange = (value) => {
        console.log('changed', value);
        setNumProduct(value)
        };
    console.log('id ' , idProduct)
    const getDetailProduct= async(context)=>{
        setDelay(true)
        const myId = context?.queryKey&& context?.queryKey[1]
        const res = await productService.getProductDetail(myId.id)
        setDelay(false)
        return res
        
    }
    console.log('localoca',location)
    const handleAddOrderProduct =()=>{
        if(!user?.id){
            navigate('/sign-in',{state : location?.pathname})
        }
        else{
            dispatch(addOrderProduct({
            orderItem :{
                    name : dataProduct?.product?.name,
                    amount:numProduct,
                    image : dataProduct?.product?.image , 
                    price : dataProduct?.product?.price , 
                    product : dataProduct?.product?._id 
            }       
            }))
        }
    }
    const {data : dataProduct ,isLoading} = useQuery({queryKey:['products' , idProduct] ,queryFn :getDetailProduct})
    console.log(dataProduct)
    return (
        <Spin spinning={delay}>
            <div className="grid px-16 shadow-lg grid-cols-6 gap-2 bg-slate-200 pt-4 ">
            <div className="col-span-3 w-[100%] rounded-lg shadow-md border-2 border-indigo-100 ">
                <div>
                    <img src={dataProduct?.product?.image} alt='anhdienthoai' className='border-2 border-indigo-100 object-cover rounded-md w-[100%] ' />
                    <div className='flex justify-around px-4 items-center '>
                        <img src={dataProduct?.product?.image} alt='anhdienthoai' className='border-indigo-200 border-2 hover:border-indigo-400 rounded-md border-1  w-[100px] '  />
                        <img src={dataProduct?.product?.image} alt='anhdienthoai' className='border-indigo-200 border-2 hover:border-indigo-400 rounded-md border-1  w-[100px] '  />
                        <img src={Image1} alt='anhdienthoai' className='border-indigo-200 border-2 hover:border-indigo-400 rounded-md border-1  w-[100px] ' />
                        <img src={dataProduct?.product?.image} alt='anhdienthoai' className='border-indigo-200 border-2 hover:border-indigo-400 rounded-md border-1  w-[100px] ' />
                        <img src={dataProduct?.product?.image} alt='anhdienthoai' className='border-indigo-200 border-2 hover:border-indigo-400 rounded-md border-1  w-[100px] '  />
                    </div>
                </div>
                
            </div>
            <div className="col-span-3 shadow-lg ">
                    <div className='w-[98%] h-full ml-4  flex flex-col '>
                        <div className='font-bold mt-4 text-2xl'>{dataProduct?.product?.name}</div>
                        <div className='flex mt-2 items-center text-xl'> <Rate  allowHalf defaultValue={dataProduct?.product?.rating} />
                            <div className="ml-2 border-dotted border-2 border-indigo-200 font-semibold">1000slot</div>
                        </div>
                        <div className='mt-2 text-3xl font-light bg-slate-200 text-red-600'>
                            {dataProduct?.product?.price} VND
                        </div>
                        <div className='flex mt-4 shadow-md  '>
                            <div className='font-semibold' > Giao đến </div>
                            <div className='italic ml-2'> {user.address}</div>
                            <div className='text-blue-600 ml-2'> Đổi Địa Chỉ </div>
                        </div>
                        <div className='mb-20'>
                            <div className='font-medium mt-6'>Số lượng còn : {dataProduct?.product?.countInStock}</div>
                        <InputNumber min={1} max={dataProduct?.product?.countInStock} defaultValue={1} onChange={onChange} changeOnWheel />
                            <div className='mt-8 flex justify-start'>
                            <button onClick={handleAddOrderProduct} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-16 border border-red-700 rounded">
    Order 
    </button>
                            <button class="bg-transparent ml-6  hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-16 border border-blue-500 hover:border-transparent rounded">
    Mua Trả Sau
                                </button>  
              
                        </div>
                        
                        </div>
                </div>
            </div>
            {/* <div className="col-span-2">3
    
            </div> */}
    
        </div> 
        </Spin>);
}

export default ProductComponent;