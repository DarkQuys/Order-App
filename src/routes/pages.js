import HomePage from "../pages/homepage/HomePage";
import OderPage from "../pages/oderpage/OderPage";
import Product from "../pages/productpage/ProductPage";
import TypeProductPage from "../pages/typeproductpages/TypeProductPages";
import SignIn from "../component/Tk/SigIn";
import SignUp from "../component/Tk/signUp";
import CreateAcc from "../component/Tk/create";
import ProfileUser from "../pages/profile/profileUser";
import AdminPage from "../pages/adminpage/AdminPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader :true 
    },
    {
        path: '/product/:id',
        page: Product,
        isShowHeader :true 
    },
    {
        path: '/typeproduct/:type',
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
        path: '/profile' ,
        page: ProfileUser,
        isShowHeader :true
    },
    {
        path: '/create-acc' ,
        page: CreateAcc,
        isShowHeader :false 
    },
    {
        path: '/system/admin' ,
        page: AdminPage,
        isPrivate : true
    },
    {
        path: '/order',
        page: OderPage,
        isShowHeader :true 
    },
]