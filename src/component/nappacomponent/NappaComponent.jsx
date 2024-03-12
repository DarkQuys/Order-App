

import { Rate } from 'antd';
function NappaComponent() {

    const renderContent = (type, options) => {
        switch (type) {
            case 'text': 
                return options.map((option) => {
                    return (
                        <div>{option}</div>
                    )
                })
            case 'checkbox':
                return options.map((option) => {
                    return (
                        <div className="flex items-center">   
                            <label className="pr-1">{option.label}</label>
                            <input type="checkbox" value={option.value} name="scales"  />
                        </div>
                    )
                })
            case 'star':
                return options.map((option) => {
                    return (
                        <div className='flex'>
                            <div>{option}</div>
                            <Rate disabled defaultValue={option} />
                        </div>
                    )
                    
                })
            case 'price':
                return options.map((option) => {
                    return (
                        <div className='mt-1 w-24 rounded-2xl p-1 bg-slate-500' >{option}</div>
                    )
                })
            
            default :
                return {}
        }
    }
    return (<div className='pl-4 pt-2 pb-3 rounded shadow-lg w-52 bg-white'>
         <h1 className='font-medium'>Label</h1>
        <div className='mt-3'>{renderContent('text', ['tu lanh', 'may giat', 'tivi'])}</div>
        <div className='mt-3'>{renderContent('checkbox', [{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }])}</div>
        <div className='mt-3'>{renderContent('star', [2, 3, 4])}</div>
       
    </div> );
}

export default NappaComponent;