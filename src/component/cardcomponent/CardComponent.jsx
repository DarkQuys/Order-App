import produc1 from '../../assets/fe77cababd0fe575333a17ef5432dabb.jpg.webp'
import logo1 from '../../assets/1be823299ae34c7ddcd922e73abd4909.png'
function CardComponent() {
    return (<div className='w-56 relative font-light h-96 rounded overflow-hidden shadow-lg'>
        <img src={produc1} alt='anhanh' />
      <div className='pt-3 pl-11 h-[100%] bg-white'>
            <div className=''>Iphone</div>
            <div className='flex  items-center pt-2 '>
                <div className='pr-[3px]'>4%</div>
                <div className='bg-slate-500 h-[14px] w-[1px]'></div>
                <div className='pl-[4px]'>da ban 1000+</div>
            </div>
            <div className='text-lg pt-2 font-medium text-red-500'>1.000.000đ</div>
        </div>
        <img src={logo1} alt='logo' className='w-[90px] h-[23px] top-0 absolute' />
     
    </div> );
}

export default CardComponent;