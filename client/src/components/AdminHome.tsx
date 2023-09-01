import DeliveryRequests from "../components/DeliveryRequests"
import AllProductsHandler from "../components/AllProductsHandler"
import AllStoreHandler from "../components/AllStoreHandler"
import { Tabs, Tab } from "@mui/material"
import { tab } from "@testing-library/user-event/dist/tab"
import { useState } from "react"


const AdminHome = () => {

  const [tab, setTab] = useState(0);  

  const handleChange = (newValue: number) => {
    setTab(newValue)
  }

  return (
    <div>
      <Tabs
        indicatorColor="primary"
        value={tab}
      >
        <Tab sx={{fontSize: "1em"}} label="Delivery Requests" onClick={() => handleChange(0)}/>
        <Tab sx={{fontSize: "1em"}} label="Manage Products" onClick={() => handleChange(1)}/>
        <Tab sx={{fontSize: "1em"}} label="Store Management" onClick={() => handleChange(2)}/>
        {/* {/* <Tab sx={{fontSize: "1em"}} label="Transactions" onClick={() => handleChange(2)}/> */}
      </Tabs>
      {(tab === 0) && <DeliveryRequests />}
      {(tab === 1) && <AllProductsHandler />}
      {(tab === 2) && <AllStoreHandler />}
      {/* {(tab === 2) && <Transactions StoreId={Id}/>}
      {(tab === 3) && <Deliveries StoreId={Id}/>} */}
    </div>
  )
}

export default AdminHome
