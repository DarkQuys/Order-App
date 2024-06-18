
import Slider from "react-slick";
import OrderComponent from "../../component/orderComponent/orderComponent";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

function OderPage() {
    const orrder = useSelector((state)=>state.order.orderItems)
    console.log('oo',orrder)
    
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
      return (
        <div className="pl-60 mt-3 px-10">
            <div className="w-[1000px] items-center mb-3 h-[50px] bg-blue-100 shadow-lg flex rounded justify-around">
                <div>San pham</div>
                <div>Don gia</div>
                <div>So luong</div>
                <div>Thanh tien</div>
                <DeleteOutlined />
            </div>
            {orrder?.map((item)=>{
              return (
                <div className="mb-3">
                  <OrderComponent name={item?.name} price={item?.price} mount={item?.amount} product={item?.product} />
                </div>
              )

            })}
            
        </div>
      );
}

export default OderPage
