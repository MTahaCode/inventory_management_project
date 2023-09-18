import { Typography, Box, Container, Tabs, Tab, Paper} from '@mui/material';
import React, { useEffect, useState } from 'react'

interface transactionsProps {
  StoreId: string;
}

interface productInfo {
  Name: string;
  Quantity: number;
}

interface ListTemplate {
  Products: productInfo[];
  DateTime: string;
  TotalPrice: number;
}

const Transactions: React.FC<transactionsProps> = ({ StoreId }) => {

  const [TransactionsHistory, setTransactionsHistory] = useState<ListTemplate[]>([]);

  useEffect(() => {
    fetch("/getTransactionsHistory",
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
        setTransactionsHistory(data);
        console.log(data);
      }
    )
  },[]);

  const GetDate = (dateTime: string) => {
    // console.log(dateTime);
    const date = new Date(dateTime);
    
    const dateFormat: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    
    const formattedDateTime = date.toLocaleDateString('en-US', dateFormat);
    return formattedDateTime;
  }

  return (
    <Box>
      {TransactionsHistory.map((index: ListTemplate) => {
        return (
          <Paper sx={{padding: "1em 0em 1em 2em", margin: "0em 0em 1em 0em"}}>
            <Box sx={{display: "flex", alignItems: "center", gap:"1em"}}>
              <Typography variant='h6' color={"primary"}>
                Date: 
              </Typography>
              <Typography>
                {GetDate(index.DateTime)}
              </Typography>
            </Box>
            <Box sx={{display: "flex", alignItems: "center", gap:"1em"}}>
              <Typography variant='h6' color={"primary"}>
                Total Price: 
              </Typography>
              <Typography>
                {`${index.TotalPrice} Rs`}
              </Typography>
            </Box>
            <Typography variant='h6' color={"primary"}>
              Products Sold: 
            </Typography>
            <Box>
              {index.Products.map((product: productInfo) => {
                return (
                  <Box sx={{display: "flex", gap: "1em", marginLeft: "6em"}}>
                    <Typography>
                      {product.Quantity}
                    </Typography>
                    <Typography>
                      {product.Name}
                    </Typography>
                  </Box>
                )
              })}
            </Box>
          </Paper>
        )
      })}
    </Box>
  )
}

export default Transactions
