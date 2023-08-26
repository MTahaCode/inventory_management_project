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

  return (
    <Box>
      {TransactionsHistory.map((index: ListTemplate) => {
        return (
          <Paper>
            {index.Products.map((product: productInfo) => {
              return (
                <>
                  <Typography>
                    {product.Name}
                  </Typography>
                  <Typography>
                    {product.Quantity}
                  </Typography>
                </>
              )
            })}
            <Typography>
              {index.DateTime}
            </Typography>
            <Typography>
              {index.TotalPrice}
            </Typography>
          </Paper>
        )
      })}
    </Box>
  )
}

export default Transactions
