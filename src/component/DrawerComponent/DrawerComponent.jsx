import { Drawer } from "antd";
import { useState } from "react";



const DrawerComponent = ({title = "Drawer" ,placement="right", isOpen=false ,...rest })=>{
//     const [open, setOpen] = useState(false);
//   const showDrawer = () => {
//     setOpen(true);
//   };
//   const onClose = () => {
//      isOpen = false
//   };
  return (
    <>
      {/* <Button type="primary" onClick={showDrawer}>
        Open
      </Button> */}
      <Drawer title={title} {...rest}  placement={placement} open={isOpen}>
      
      </Drawer>
    </>
  );

}
export default DrawerComponent