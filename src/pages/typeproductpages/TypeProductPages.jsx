import NappaComponent from "../../component/nappacomponent/NappaComponent";
import CardComponent from "../../component/cardcomponent/CardComponent";
import { Pagination } from "antd";
function TypeProductPage() {
    return (
        <div className="pt-5 pl-20  bg-slate-300 pr-6">
            <div className="grid grid-cols-6  ">
            <div className="ml-4 ">
                <NappaComponent/>
            </div>
            <div className="col-span-5 flex gap-4 grid grid-cols-5">
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
                <CardComponent />
            </div>
    
            </div>
            <div className="pl-96">
            <Pagination defaultCurrent={6} total={500} />;
            </div>
         
        </div>
    );
}

export default TypeProductPage;