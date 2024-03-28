import { BrowserRouter as Router ,Routes ,Route  } from 'react-router-dom'
import './App.css';
import { routes } from './routes/pages';
import HeaderAnd from './component/headerAnd/HeaderAnd';
import { Fragment } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
function App() {
  useEffect(()=> {
      fetApi()
  }, [])
  const fetApi = async () => {
    const res = await axios.get('http://localhost:3003/api/product/getallproduct')
    console.log(res.data)
    return res.data
  }
  return (
    
   
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            const Layout = route.isShowHeader ? HeaderAnd : Fragment
            return (
              <Route key={route.path} path={route.path} 
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
