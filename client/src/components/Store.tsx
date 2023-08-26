import React, { useState } from 'react'
import { Typography,Box, Container, Tabs, Tab} from '@mui/material';
import { useLocation } from 'react-router-dom'
import Workers from "./Workers"
import Products from "./Products"
import Transactions from "./Transactions"
import Deliveries from "./Deliveries"

const Store = () => {

  const location = useLocation();

  const Name = location.state.name;
  const Id = location.state.id;

  const [tab, setTab] = useState(0);  

  const handleChange = (newValue: number) => {
    setTab(newValue)
  }

  return (
    <Box>
      <Typography>{Name}</Typography>
      <Tabs
        indicatorColor="primary"
        value={tab}
      >
        <Tab label="Workers" onClick={() => handleChange(0)}/>
        <Tab label="Products" onClick={() => handleChange(1)}/>
        <Tab label="Transactions" onClick={() => handleChange(2)}/>
        <Tab label="Deliveries" onClick={() => handleChange(3)}/>
      </Tabs>
      {(tab === 0) && <Workers StoreId={Id}/>}
      {(tab === 1) && <Products StoreId={Id}/>}
      {(tab === 2) && <Transactions StoreId={Id}/>}
      {(tab === 3) && <Deliveries StoreId={Id}/>}
    </Box>
  )
}

export default Store
