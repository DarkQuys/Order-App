import NappaComponent from "../../component/nappacomponent/NappaComponent";
import CardComponent from "../../component/cardcomponent/CardComponent";
import { Pagination } from "antd";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import * as productService from '../../service/ProductService'
import { useState } from "react";
function TypeProductPage() {
    const {state} = useLocation()
    const [products , setProducts] = useState([])
    const [pagination , setPagination] = useState({
        page : 0 ,
        limit : 10 ,
        total :1
    })
    console.log(state)
    const getType = async(type , page ,limit)=>{
        const res = await(productService.getProductFromType(type,page,limit))
        setProducts(res.data)
        setPagination({
            ...pagination , total : res.total
        })
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
    return (
        <div className="pt-5 pl-20  bg-slate-300 pr-6">
            <div className="grid grid-cols-6  ">
            <div className="ml-4 mt-7">
                <NappaComponent/>
            </div>
            <div className="col-span-5 ml-5 flex gap-4 grid grid-cols-5">
               {products.map((product)=>{
                return (
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
                )
               })}
            </div>
    
            </div>
            <div className="pl-96">
            <Pagination onChange={onChange} defaultCurrent={pagination.page+1} total={pagination.total} />;
            </div>
         
        </div>
    );
}

export default TypeProductPage;