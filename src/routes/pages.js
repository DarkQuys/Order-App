import HomePage from "../pages/homepage/HomePage";
import OderPage from "../pages/oderpage/OderPage";
import Product from "../pages/productpage/ProductPage";
import TypeProductPage from "../pages/typeproductpages/TypeProductPages";
import SignIn from "../component/Tk/SigIn";
import SignUp from "../component/Tk/signUp";
import CreateAcc from "../component/Tk/create";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader :true 
    },
    {
        path: '/product',
        page: Product,
        isShowHeader :true 
    },
    {
        path: '/type',
        page: TypeProductPage,
        isShowHeader :true 
    },
    {
        path: '/sign-in' ,
        page: SignIn,
        isShowHeader :false 
    },
    {
        path: '/sign-up' ,
        page: SignUp,
        isShowHeader :false 
    },
    {
        path: '/create-acc' ,
        page: CreateAcc,
        isShowHeader :false 
    },
    {
        path: '/other',
        page: OderPage,
        isShowHeader :true 
    },
]