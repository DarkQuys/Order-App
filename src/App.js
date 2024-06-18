import { BrowserRouter as Router ,Routes ,Route  } from 'react-router-dom'
import './App.css';
import { routes } from './routes/pages';
import HeaderAnd from './component/headerAnd/HeaderAnd';
import { Fragment } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { isJsonString } from './utils';
import { jwtDecode } from 'jwt-decode';
import * as userService from './service/UserService'
import { useDispatch } from 'react-redux';
import { updateUser } from './redux/slice/couterSlice';
import { useSelector } from 'react-redux';

function App() {
  
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(()=> {
    const {decoded , dataStorage} =handleDecoded()
    console.log(decoded);
    console.log('store', dataStorage)
    console.log('iddd' , decoded?.payload?.id)
    if(decoded?.payload?.id && dataStorage){
      handleGetUser(decoded?.payload?.id , dataStorage)
    }
  }, [])
  // const fetApi = async () => {
  //   const res = await axios.get('http://localhost:3003/api/product/getallproduct')
  //   console.log(res.data)
  //   return res.data
  // }
  const handleDecoded=()=>{
    let dataStorage = localStorage.getItem('access_token')
    let decoded = {}
    if(dataStorage && isJsonString(dataStorage)){
      dataStorage = JSON.parse(dataStorage)
      decoded = jwtDecode(dataStorage)
    }
    return {decoded , dataStorage}
  }
  userService.axiosJWT.interceptors.request.use(async(config)=>{
      const currentTime = new Date()
      const {decoded} = handleDecoded()
      if(decoded?.exp <currentTime.getTime()/1000){
        const data = await userService.refresh_token()
        console.log( 'mydata',data)
        config.headers['token'] = `Bearer ${data?.mytoken}`
      }
      return config
  },(err)=>{
    return Promise.reject(err)
  })
  const handleGetUser = async(id , token)=>{
      const res =await userService.getUser(id , token) 
      dispatch(updateUser({...res?.data , access_token : token}))
  }
 
  return (
    
   
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            const isChechAuth = !route.isPrivate || user.isAdmin
            const Layout = route.isShowHeader ? HeaderAnd : Fragment
            return (
              <Route key={route.path} path={isChechAuth && route.path} 
                element={<Layout>
              <Page />
            </Layout>}  
              />
            )  
          })}
        </Routes>
      </Router>
   </div>
  );
}

export default App;
