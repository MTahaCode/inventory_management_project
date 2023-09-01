import { Container, Drawer, Button, List, Box, Typography, Tabs, Tab } from "@mui/material";
import { Outlet } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Workers from "../components/Workers"
import Products from "../components/Products"
import Transactions from "../components/Transactions"
import Deliveries from "../components/Deliveries"
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from "react";


const Manager = () => {

  const location = useLocation();

  const StoreId = location.state.storeId;

  const [tab, setTab] = useState(0);  

  const handleChange = (newValue: number) => {
    setTab(newValue)
  }

  useEffect(() => {
    console.log(StoreId);
  },[]);
  
  return (
    <MainLayout>
      <Container sx={{
          overflow: "auto",
          height: "100vh",
          display: "flex",
          flexDirection:"column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          // border: "2px solid red",
          backgroundColor: "rgba(0, 24, 57, 0.6)",
        }}>
        <Box>
          {/* <Typography 
            variant='h3' 
            color={"primary"}
            margin={"0.5em 0em 1em 0em"}
          >
            {Name}
          </Typography> */}
          {/* <Deliveries StoreId={Id} /> */}
        </Box>
        <Container>
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
          {(tab === 0) && <Workers StoreId={StoreId} UserType={"Manager"}/>}
          {(tab === 1) && <Products StoreId={StoreId}/>}
          {(tab === 2) && <Transactions StoreId={StoreId}/>}
          {(tab === 3) && <Deliveries StoreId={StoreId}/>}
        </Container>
      </Container>
    </MainLayout>
  )
}

export default Manager
