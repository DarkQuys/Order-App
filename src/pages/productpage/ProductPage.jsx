import { useParams } from "react-router-dom";
import ProductComponent from "../../component/productdetail/ProductComponent";

function Product() {
    const idProduct = useParams()
    return ( 
        <div>
            <ProductComponent idProduct={idProduct}/>
    </div>
     );
}

export default Product;