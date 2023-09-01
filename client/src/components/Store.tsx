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
      <Typography 
        variant='h3' 
        color={"primary"}
        margin={"0.5em 0em 1em 0em"}
      >
        {Name}
      </Typography>
      {/* <Deliveries StoreId={Id} /> */}
      <Tabs
        indicatorColor="primary"
        value={tab}
        variant='scrollable'
      >
        <Tab sx={{fontSize: "1em"}} label="Workers" onClick={() => handleChange(0)}/>
        <Tab sx={{fontSize: "1em"}} label="Products" onClick={() => handleChange(1)}/>
        <Tab sx={{fontSize: "1em"}} label="Transactions" onClick={() => handleChange(2)}/>
        <Tab sx={{fontSize: "1em"}} label="Deliveries" onClick={() => handleChange(3)}/>
      </Tabs>
      {(tab === 0) && <Workers StoreId={Id} UserType={"Admin"}/>}
      {(tab === 1) && <Products StoreId={Id}/>}
      {(tab === 2) && <Transactions StoreId={Id}/>}
      {(tab === 3) && <Deliveries StoreId={Id}/>}
    </Box>
  )
}

export default Store
