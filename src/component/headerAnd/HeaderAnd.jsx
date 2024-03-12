import Header from "../header/Header";
function HeaderAnd({ children}) {
    return ( 
        <div className="">
            <Header />
            {children}
        </div>
     );
}

export default HeaderAnd;