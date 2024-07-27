import {Menu, Typography } from "antd"
import { HomeFilled, ShoppingCartOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"




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
    <ShoppingCartOutlined className="shoppingCart"/>
    
    
    
    </div>
  )
}


export default AppHeader