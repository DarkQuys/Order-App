
import Image1 from '../../assets/fe77cababd0fe575333a17ef5432dabb.jpg.webp'
import { Rate } from 'antd';
import { InputNumber } from 'antd';


function ProductComponent() {
    const onChange = (value) => {
        console.log('changed', value);
      };
    return (
        <div className="grid px-16 shadow-lg grid-cols-6 gap-2 bg-slate-200 pt-4 ">
        <div className="col-span-3 w-[100%] rounded-lg shadow-md border-2 border-indigo-200 ">
            <div>
                <img src={Image1} alt='anhdienthoai' className='border-2 border-indigo-200 object-cover rounded-md w-[100%] ' />
                <div className='flex justify-around px-4 items-center '>
                    <img src={Image1} alt='anhdienthoai' className='border-indigo-200 border-2 hover:border-indigo-400 rounded-md border-1  w-[100px] '  />
                    <img src={Image1} alt='anhdienthoai' className='border-indigo-200 border-2 hover:border-indigo-400 rounded-md border-1  w-[100px] '  />
                    <img src={Image1} alt='anhdienthoai' className='border-indigo-200 border-2 hover:border-indigo-400 rounded-md border-1  w-[100px] ' />
                    <img src={Image1} alt='anhdienthoai' className='border-indigo-200 border-2 hover:border-indigo-400 rounded-md border-1  w-[100px] ' />
                    <img src={Image1} alt='anhdienthoai' className='border-indigo-200 border-2 hover:border-indigo-400 rounded-md border-1  w-[100px] '  />
                </div>
            </div>
            
        </div>
        <div className="col-span-3 shadow-lg ">
                <div className='w-[98%] ml-4 mt-5'>
                    <div className='font-bold text-2xl'>This IS Name SP</div>
                    <div className='flex items-center mt-4'> <Rate disabled defaultValue={2} />
                        <div className="ml-2 border-dotted border-2 border-indigo-200 font-semibold">1000slot</div>
                    </div>
                    <div className='ml-4 text-3xl mt-5 font-light bg-slate-200'>200.000$</div>
                    <div className='flex mt-4 shadow-md  '>
                        <div className='font-semibold' > Giao đến </div>
                        <div className='italic ml-2'> Bac Ninh Que Toi </div>
                        <div className='text-blue-600 ml-2'> Đổi Địa Chỉ </div>
                    </div>
                    <div className='mt-4 '>
                        <div className='font-medium mt-6'>Số Lượng</div>
                    <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} changeOnWheel />
                        <div className='mt-8 flex justify-start'>
                        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-16 border border-red-700 rounded">
Chọn Mua 
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

    </div> );
}

export default ProductComponent;