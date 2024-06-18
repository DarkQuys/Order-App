
import SliderComponent from "../../component/slide/SliderComponent";
import slider1 from "../../assets/anh-bia-facebook-anime-boy_042004452.jpg"
import slider2 from "../../assets/anh-bia-facebook-anime-lanh-lung-3-800x296.jpg"
import slider3 from "../../assets/anh-bia-facebook-anime_042004650.jpg"
import CardComponent from "../../component/cardcomponent/CardComponent";
import NappaComponent from "../../component/nappacomponent/NappaComponent";
import * as ProductService from "../../service/ProductService"
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "antd";
import LoadingComponent from "../../component/Loading/LoadingComponent";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const orr = useSelector(state => state.order)
  console.log('rr' , orr);
  const navigate = useNavigate()
  const resSearch = useRef()
  const searchProducct = useSelector(state=> state?.product?.search)
  const [stateProduct , setStateProduct] =useState([])
  const [allType , setAllType] = useState([])
  const [limit , setLimit] = useState(5)
  const fetchProduct  = async(context)=>{
      const search=context?.queryKey&&context?.queryKey[1]
      const limit =context?.queryKey&&context?.queryKey[2]
      console.log('context',search ,'limit' ,limit)
      const res = await ProductService.getAllProduct(search ,limit)  
      console.log('res ne ' , res); 
      //setStateProduct(res?.data)
      return res 
    }
    const {isLoading , data : products} = useQuery({ queryKey: ['products' , searchProducct ,limit ] , queryFn: fetchProduct ,retry:3 ,retryDelay:1000 } )
    console.log('kk',products)
  // useEffect(()=>{
  //   if(resSearch.current){
  //     fetchProduct(searchProducct)
  //   }
  //   resSearch.current=true
    
  // },[searchProducct])
  const handleOnDetailProduct =(id)=>{
        navigate(`/product/${id}`)
  }
  
  const getType = async()=>{
    const res = await ProductService.getAllType()
    setAllType(res.alltype)
  } 
  useEffect(()=>{
    getType()
  },[])
  
  const swap =(str)=>{
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Remove extra spaces and diacritical marks
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Combining Diacritical Marks
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Other tone marks
    // Replace spaces with hyphens
    str = str.replace(/\s+/g, "-");
    return str;
  }
  const handleToTypeProduct =(name)=>{
    navigate(`/typeproduct/${swap(name)}`,{state:name})
  }

  const call = async(type)=>{
        const res= await ProductService.getProductFromType(type,1)
        console.log('tyty' ,res)
  }
  useEffect(()=>{
      call('áo')
  },[])

    return ( 
  <div className="px-28">
    <LoadingComponent isLoading={isLoading}>
    <SliderComponent arrImg={[slider3,slider2 ]} />
  


<nav class="bg-white dark:bg-gray-300 h-[45px] w-full  border-b border-gray-200 ">
<div className="flex mt-7 items-center justify-around  ">{allType.map((ha)=>{
      return (
        <div onClick={()=>handleToTypeProduct(ha)} className="mr-20 ml-2 mt-2 cursor-pointer hover:text-sky-400">{ha}</div>
      )
    })}</div>
</nav>

   
       <div className='flex grid grid-cols-5'>
              {products?.data?.map((product)=>{
                return (
                 <div onClick={()=>handleOnDetailProduct(product._id)}  className="cursor-pointer" >
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
   
     <div className="flex justify-center mt-7"><Button disabled={products?.data?.length===products?.total} onClick={()=> setLimit(pev=> pev+5)} className="bg-blue-400">More Page</Button></div>
         {/* <NappaComponent/> */}
         </LoadingComponent>
  </div>
  
     );
}

export default HomePage;