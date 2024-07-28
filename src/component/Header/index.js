import {Badge, Drawer, InputNumber, Menu, Table, Typography } from "antd"
import { HomeFilled, ShoppingCartOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import {getCart} from "../../API";



function AppHeader(){
  const navigate=useNavigate();
  const onMenuClick = (item)=>{
    navigate(`/${item.key}`)
  }
  return( <div className='appHeader'>
    
    <Menu
    onClick={onMenuClick}
    mode="horizontal"
    items={[
      {
        label:<HomeFilled/>,
        key:""
      },  
      {
        label:"Man",
        key:"man",
        children:[
          {
            label:"Men's Shirts",
            key:"mens-shirts"
          },{
            label:"Men's Shoes",
            key:"mens-shoes"
          },{
            label:"Men's Watches",
            key:"mens-watches"
          }
        ]
      },{
        label:"Women",
        key:"women",
        children:[
          {
            label:"women's Dress",
            key:"womens-dresses"
          },
          {
            label:"women's Shoses",
            key:"womens-shoes"
          },
          {
            label:"women's Bags",
            key:"womens-bags"
          },
        ]
      },
      {
        label:"Fragrances",
        key:"Fragrances",
        
        
      },
    ]}
    />

    <Typography.Title>Aisha Store</Typography.Title>
   <AppCart/>
    </div>


  )
}


 function AppCart(){
  const [cartDrawerOpen,SetCartDrawerOpen]=useState(false)
  const [cartItems,SetCartItems]=useState([])

  useEffect(()=>{
    getCart().then(res =>{
      SetCartItems(res.products)
    })
  },[])
  return(
   <div>
    <Badge onClick={()=>{
      SetCartDrawerOpen(true)
    }} count={7} className="shoppingCart">
  <ShoppingCartOutlined />
  </Badge>
  <Drawer open={cartDrawerOpen} onClose={()=>{
    SetCartDrawerOpen(false)
  }} 
    title="your cart"
    contentWrapperStyle={{width:500}}
  
  >

  <Table
  pagination={false}
  columns={[
    {
    title:'Title',
    dataIndex:'title'
  },{
    title:"price",
    dataIndex:"price",
    render:(value)=>{
      return <span>${value}</span>
    }
  },{
    title:"quantity",
    dataIndex:"quantity",
    render:(value)=>{
      return <InputNumber min={0} defaultValue={value}></InputNumber>
    }
  },{
    title:"total",
    dataIndex:"total",
    render:(value)=>{
      return <span >${value}</span>
    }
  }
  
  ]}
   dataSource={cartItems}
   summary={(data) =>{
   const  total=data.reduce((pre, current)=>{
      return pre + current.total
    },0)
    return <span>Total:{total}</span>
   }}
  
  />

  </Drawer>
  </div> 
  ) 
 }

export default AppHeader