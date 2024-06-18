import produc1 from '../../assets/fe77cababd0fe575333a17ef5432dabb.jpg.webp'
import logo1 from '../../assets/1be823299ae34c7ddcd922e73abd4909.png'
import { useParams } from 'react-router-dom';
import { Rate } from 'antd';
import { StarOutlined } from '@ant-design/icons';

function CardComponent(props) {
    const {countInStock , description , image , name , price , rating , type } = props

    
    return (<div className='w-56 mt-7 relative font-light h-96 rounded overflow-hidden shadow-lg'>
       <div className='h-[200px] flex items-center'> <img src={image} alt='picture' /></div>
      <div className='pt-3 pl-11 h-[100%] bg-violet-50'>
            <div className=''>{type}</div>
            <div className='flex  items-center pt-2 '>
                <div className='pr-[3px]'>
                    {rating}
                <StarOutlined className='text-yellow-400'/>
                </div>
                <div className='bg-slate-500 h-[14px] w-[1px]'></div>
                <div className='pl-[4px]'>da ban 1000+</div>
            </div>
            <div className='text-lg pt-2 font-medium text-red-500'>{price}</div>
        </div>
        <img src={logo1} alt='logo' className='w-[90px] h-[23px] top-0 absolute' />
     
    </div> );
}

export default CardComponent;