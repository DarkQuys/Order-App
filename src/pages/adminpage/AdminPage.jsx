import { ProductOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import AdminUser from '../../component/adminUser/AminUser';
import AdminProduct from '../../component/adminProduct/AdminProduct';
const AdminPage = ()=>{
    const [keySelected , setKeySelected]  = useState('')
    function getItem(label, key, icon, children, type) {
        return {
          key,
          icon,
          children,
          label,
          type,
        };
      }
      const renderPage = (key)=>{
        switch (key) {
          case 'user' :
            return (
              <AdminUser/>
            )
          case 'products' :
            return(
              <AdminProduct/>
            )
          default: 
          return <></>
        }


      }
    // const items = [
    //     getItem('Users', 'sub1', <UserOutlined />, [
    //       getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
    //     ]),
    //     getItem('Products', 'sub2',<ProductOutlined />, [
    //       getItem('Option 5', '5'),
    //       getItem('Option 6', '6'),
    //       getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    //     ]),
       
    //   ];
      const items = [
        getItem('Users', 'user', <UserOutlined />),
        getItem('Products', 'products',<ProductOutlined />)
      ];
    const onClick = (e) => {
        console.log('click ', e.key);
        setKeySelected(e.key)
      };
      return (
  <div className='flex'>
       <div>
            <Menu
              onClick={onClick}
              style={{
                width: 256,
              }}
              // defaultSelectedKeys={['1']}
              // defaultOpenKeys={['sub1']}
              mode="inline"
              items={items}
            />
       </div>
         <div className=' w-full'> {renderPage(keySelected)}</div>
  </div>
      )
}
export default AdminPage