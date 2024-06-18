
import React, { useMemo, useState } from 'react';
import { Button, Divider, Radio, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import { Excel } from "antd-table-saveas-excel";

// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sydney No. 1 Lake Park',
//   },
//   {
//     key: '4',
//     name: 'Disabled User',
//     age: 99,
//     address: 'Sydney No. 1 Lake Park',
//   },
// ];


// rowSelection object indicates the need for row selection


function TableComponent(props){
  
  const {selectionType ='checkbox' , products = [] , columns =[] , handleDeleteManyProduct } = props 
  
    // const renderAction =()=>{
    //     return (
    //         <div>
    //             <EditOutlined className='mr-5 text-blue-400 hover:text-violet-600'/>
    //             <DeleteOutlined className='text-red-400 hover:text-red-600'/>
    //         </div>
    //     )
    // }
    // const columns = [
    //     {
    //       title: 'Name',
    //       dataIndex: 'name',
    //       render: (text) => <a>{text}</a>,
    //     },
    //     {
    //       title: 'Price',
    //       dataIndex: 'price',
    //     },
    //     {
    //       title: 'Type',
    //       dataIndex: 'type',
    //     },
    //     {
    //       title: 'Rating',
    //       dataIndex: 'rating',
    //     },
    //     {
    //       title: 'Action',
    //       dataIndex: 'action',
    //       render : renderAction
    //     },
    //   ];
    const [selectedRow ,setSelectedRow] = useState([])
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          setSelectedRow(selectedRowKeys)
          console.log(`selectedRowKeys: ${selectedRowKeys}`);
        },
        // getCheckboxProps: (record) => ({
        //   disabled: record.name === 'Disabled User',
        //   // Column configuration not to be checked
        //   name: record.name,
        // }),
      };
    const handleDeleteAll = ()=>{
      handleDeleteManyProduct(selectedRow)
    }
 //const [selectionType, setSelectionType] = useState('checkbox');


 const data = products?.map((product)=>{
    return {...product , key: product._id , isAmin:product.isAmin?'TRUE' : 'FALSE'}
 })
 const newColumnExport =useMemo(()=>{
  const arr = columns.filter((col)=> col.dataIndex != 'action')
  return arr
 },[columns])
 
 console.log(newColumnExport ,'and' , columns)

 const handleToExcel = () => {
  const excel = new Excel();
  excel
    .addSheet("test")
    .addColumns(newColumnExport)
    .addDataSource(data, {
      str2Percent: true
    })
    .saveAs("Excel.xlsx");
  };
  return (
    <div className="w-full">
    {selectedRow?.length && 
    (  <Button onClick={handleDeleteAll} type="primary" danger>
            Xoá mục đã chọn
            </Button>)}
      <Radio.Group
        // onChange={({ target: { value } }) => {
        //   setSelectionType(value);
        // }}
        value={selectionType}
      >
        <Radio value="checkbox">Checkbox</Radio>
        <Radio value="radio">radio</Radio>
      </Radio.Group>

      <Divider />
      <button onClick={handleToExcel}>Export</button>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        {...props}
        size='large'
      />
    </div>
  );
}

export default TableComponent