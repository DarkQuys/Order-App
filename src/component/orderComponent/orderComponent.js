import { DeleteOutlined } from "@ant-design/icons"
import { deleteOrDerProduct } from "../../redux/slice/orderSlide"
import { useDispatch } from "react-redux"

const OrderComponent = ({image , name , price , mount ,product, thanhtien})=>{
    const dispatch = useDispatch()
    
    const handleDelete = ()=>{
       console.log('produc' , product)
       dispatch(deleteOrDerProduct({idProduct : product}))

    }
    return (
        <div>
            <div className="w-[1000px] box-border items-center h-[130px] bg-blue-100 shadow-lg flex rounded ">
              
                   <div className="box-border flex flex-col ml-[57px]" > <img className="h-20" src="https://i5.walmartimages.com/asr/cde7fe31-78c2-434c-bbd0-e3acd8d7e9ff.ebd2fccd1adf37e03140ece924ecd221.jpeg" alt='hinhanh'/>
                    <div>{name} </div>
                   </div>      
                <div className=" box-border ml-[131px]">{price}</div>
                <div className=" box-border ml-[180px]">{mount}</div>
                <div className=" box-border ml-[196px]">Thanh tien</div>
                 <DeleteOutlined onClick={handleDelete} className="ml-[144px]" />
            </div>
        </div>
    )
}
export default OrderComponent