import NappaComponent from "../../component/nappacomponent/NappaComponent";
import CardComponent from "../../component/cardcomponent/CardComponent";
import { Pagination } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import * as productService from '../../service/ProductService'
import { useState } from "react";
import LoadingComponent from "../../component/Loading/LoadingComponent";
import { Spin } from "antd"
function TypeProductPage() {
    const navigate = useNavigate()
    const {state} = useLocation()
    const [products , setProducts] = useState([])
    const [delay , isDelay] = useState()
    const [pagination , setPagination] = useState({
        page : 0 ,
        limit : 10 ,
        total :1
    })
    console.log(state)
    const getType = async(type , page ,limit)=>{
        isDelay(true)
        const res = await(productService.getProductFromType(type,page,limit))
        setProducts(res.data)
        setPagination({
            ...pagination , total : res.total
        })
        isDelay(false)
        console.log('hi',res)
    }
    useEffect(()=>{
        getType(state,pagination.page, pagination.limit)
    },[state , pagination.page ,pagination.total])
    const onChange=(a , b)=>{
        setPagination({
            ...pagination ,
            page : a-1 , 
            limit : b ,
        })
    }
    const handleOnDetailProduct =(id)=>{
        navigate(`/product/${id}`)
  }
    return (
       <Spin spinning={delay}>
            <div className="pt-2 pl-20  bg-slate-300 pr-6">
                <div className="grid grid-cols-6  ">
                <div className="ml-4 font-bold text-2xl mt-7">
                    Loại mặt hàng : 
                    <div className="text-red-500">{state}</div>
                    {/* <NappaComponent/> */}
                </div>
                <div className="col-span-5 mb-4 gap-10 grid grid-cols-5">
                   {products.map((product)=>{
                    return (
                            <div onClick={()=>handleOnDetailProduct(product._id)} >
                                    <CardComponent
                                    key={product._id}
                                    countInStock = {product.countInStock}
                                    description= {product.description}
                                    rating = {product.rating}
                                    image = {product.image}
                                    name = {product.name} 
                                    price ={product.price} 
                                    type = {product.type}  
                                  />
                            </div>
                      
                   
                    )
                   })}
                </div>
        
                </div>
                <div className="pl-96">
                <Pagination onChange={onChange} defaultCurrent={pagination.page+1} total={pagination.total} />;
                </div>
             
            </div>
       </Spin>
    );
}

export default TypeProductPage;