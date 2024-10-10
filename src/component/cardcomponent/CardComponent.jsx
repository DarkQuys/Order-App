import produc1 from '../../assets/fe77cababd0fe575333a17ef5432dabb.jpg.webp'
import logo1 from '../../assets/1be823299ae34c7ddcd922e73abd4909.png'
import { useParams } from 'react-router-dom';
import { Rate } from 'antd';
import { StarOutlined } from '@ant-design/icons';

function CardComponent(props) {
    const {countInStock , description , image , name , price , rating , type } = props

    
    return (<div className='hover:opacity-80  w-56 mt-7 relative font-light h-96 rounded overflow-hidden shadow-lg'>
       <div className='h-[200px] flex items-center'> <img src={image} className='objectFit h-[200px] w-[225px]' alt='picture' /></div>
      <div className='hover:bg-violet-200 pt-3 pl-4 h-[100%] bg-violet-50'>
            <div className='text-lg font-semibold
 '>{type}</div>
            <div className='flex flex-col  pt-2 '>
                <div className='pr-[3px]'>
                <Rate allowHalf defaultValue={rating} />
                </div>
                <div className='mt-2'>Đã bán 1000+</div>
            </div>
            <div className='text-lg pt-2 font-medium text-red-500'>{price} Đồng</div>
        </div>
        <img src={logo1} alt='logo' className='w-[90px] h-[23px] top-0 absolute' />
     
    </div> );
}

export default CardComponent;