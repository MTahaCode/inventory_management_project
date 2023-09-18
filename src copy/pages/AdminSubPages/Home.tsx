import DeliveryRequests from "../../components/DeliveryRequests"
import AllProductsHandler from "../../components/AllProductsHandler"
import AllStoreHandler from "../../components/AllStoreHandler"
import IconTemplate from "../../components/IconTemplate"
import { Tabs, Tab, Paper, Typography, Box, IconButton } from "@mui/material"
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useEffect, useState } from "react"

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';
import SettingsBackupRestoreOutlinedIcon from '@mui/icons-material/SettingsBackupRestoreOutlined';
import dayjs from "dayjs"

const Home = () => {

  const [selectedDate, setSelectedDate] = useState("");
  const [totalSales, setTotalSales] = useState(0);
  const [totalPurchases, setTotalPurchases] = useState(0);
  const [totalDeliveries, setTotalDeliveries] = useState(0);

  const GetTotals = () => {

    fetch("/getTotals", {
      method: 'post',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Date: selectedDate,
      })
    }).then(res => res.json())
    .then((data) => {
      console.log(data);
      setTotalSales(data.totalSales);
      setTotalPurchases(data.totalPurchases);
      setTotalDeliveries(data.totalDeliveries);
    })
  }

  useEffect(() => {
    GetTotals();
  },[selectedDate]);

  return (
    <Box sx={{display:"flex", flexDirection:"column"}}>
      <Typography color={"primary.light"} variant="h3" marginTop={"1em"}>
        Home Page
      </Typography>
      <Box sx={{alignSelf:"flex-end"}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker 
          label="Select Date" 
          value={dayjs()}
          onChange={(event) => (event) ? (setSelectedDate(event.format("YYYY-MM-DD"))): ""}
          />
        </LocalizationProvider>
      </Box>
      {/* <LocalizationProvider dateAdapter={}>
        <DatePicker label="Basic date picker" />
      </LocalizationProvider> */}
      <Box sx={{display:"flex", gap:"1em", flexDirection:"column", marginTop:"3em", width:"50vw", alignSelf:"center"}}>
        <IconTemplate Icon={ShoppingCartOutlinedIcon} Desc={""} Heading={"Total Sales"} Price={totalSales} IconColor="#2979ff"/>
        <IconTemplate Icon={PriceChangeOutlinedIcon} Desc={""} Heading={"Total Purchases"} Price={totalPurchases} IconColor="#2979ff"/>
        <IconTemplate Icon={SettingsBackupRestoreOutlinedIcon} Desc={""} Heading={"Total Deliveries"} Price={totalDeliveries} IconColor="#aa2e25"/>
      </Box>
      {/*<Tabs
        indicatorColor="primary"
        value={tab}
      >
        <Tab sx={{fontSize: "1em"}} label="Delivery Requests" onClick={() => handleChange(0)}/>
        <Tab sx={{fontSize: "1em"}} label="Manage Products" onClick={() => handleChange(1)}/>
        <Tab sx={{fontSize: "1em"}} label="Store Management" onClick={() => handleChange(2)}/>
        {/* {/* <Tab sx={{fontSize: "1em"}} label="Transactions" onClick={() => handleChange(2)}/> */}
      {/* </Tabs>
      {(tab === 0) && <DeliveryRequests />}
      {(tab === 1) && <AllProductsHandler />}
      {(tab === 2) && <AllStoreHandler />}  */}
      {/* {(tab === 2) && <Transactions StoreId={Id}/>}
      {(tab === 3) && <Deliveries StoreId={Id}/>} */}
    </Box>
  )
}

export default Home
