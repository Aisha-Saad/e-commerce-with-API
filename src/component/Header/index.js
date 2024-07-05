import {Menu} from "antd"
import { HomeFilled } from "@ant-design/icons"
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
        key:"home"
      },  {
        label:"Women",
        key:"",
        children:[
          {
            label:"women Dress",
            key:"women-dress"
          },
          {
            label:"women Shoses",
            key:"women-shose"
          },
          {
            label:"women Bug",
            key:"women-bug"
          },
        ]
      },
      {
        label:"Man",
        key:"man",
        children:[
          {
            label:"",
            key:""
          }
        ]
      },
      {
        label:"Boys",
        key:"boys",
        children:[
          {
            label:"",
            key:""
          }
        ]
      },
    ]}
    />

    
    
    
    
    </div>
  )
}


export default AppHeader