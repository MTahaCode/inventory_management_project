import React, { useEffect, useState } from 'react'
import { Box, Paper, Typography } from "@mui/material"

interface deliveryProps {
  StoreId: string;
}

interface ListTemplate {
  SupplierName: string;
  ProductName: string;
  Price: number;
  Date: Date;
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
          <Paper>
            <Typography>
              {item.ProductName}
            </Typography>
            <Typography>
              {item.SupplierName}
            </Typography>
            <Typography>
              {item.Price}
            </Typography>
            <Typography>
              {item.Date.toISOString()}
            </Typography>
          </Paper>
        )
      })}
    </Box>
  )
}

export default Deliveries;
