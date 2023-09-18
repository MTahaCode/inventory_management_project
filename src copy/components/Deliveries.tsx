import React, { useEffect, useState } from 'react'
import { Box, Paper, Typography } from "@mui/material"

interface deliveryProps {
  StoreId: string;
}

interface ListTemplate {
  SupplierName: string;
  ProductName: string;
  Price: number;
  // Date: Date;
}

const Deliveries: React.FC<deliveryProps> = ({ StoreId }) => {
  
  const [deliveryHistory, setDeliveryHistory] = useState<ListTemplate[]>([])

  useEffect(() => {
    fetch("/getDeliveryHistory",
    {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: StoreId,
        })
    }).then(res => res.json())
    .then(
      (data: ListTemplate[]) => {
        setDeliveryHistory(data);
      }
    )
  },[]);

  return (
    <Box>
      {deliveryHistory.map((item) => {
        return (
          <Paper sx={{padding: "1em 0em 1em 2em", margin: "0em 0em 1em 0em"}}>
            <Box sx={{display: "flex", alignItems: "center", gap:"1em"}}>
              <Typography variant='h6' color={"primary"}>
                Products : 
              </Typography>
              <Typography>
                {item.ProductName}
              </Typography>
            </Box>
            <Box sx={{display: "flex", alignItems: "center", gap:"1em"}}>
              <Typography variant='h6' color={"primary"}>
                Supplier : 
              </Typography>
              <Typography>
                {item.SupplierName}
              </Typography>
            </Box>
            <Box sx={{display: "flex", alignItems: "center", gap:"1em"}}>
              <Typography variant='h6' color={"primary"}>
                Total Price : 
              </Typography>
              <Typography>
                {item.Price}
              </Typography>
            </Box>
              {/* <Typography>
                {item.Date.toISOString()}
              </Typography> */}
          </Paper>
        )
      })}
    </Box>
  )
}

export default Deliveries;
