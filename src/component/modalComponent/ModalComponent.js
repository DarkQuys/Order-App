import React, { useState } from 'react';
import { Button, Modal } from 'antd';
const ModalComponent =({title = 'modal' , isOpen =false , children , ...rest})=>{
 
    return (
        <>
        {/* <Button type="primary" onClick={showModal}>
          Open Modal
        </Button> */}
        <Modal title={title} open={isOpen} {...rest}>
          {children}
        </Modal>
      </>
    )
}
export default ModalComponent