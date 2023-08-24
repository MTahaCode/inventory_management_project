import { Box, TableContainer, Table, TableHead, TableBody, TableCell, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'

interface ProductsProps {
  StoreId: number;
}

interface ListTemplate {
  Name: string;
  Desc: string;
  Price: number;
  Quantity: number;
}

const Products: React.FC<ProductsProps> = ({StoreId}) => {

  const [ProductsList, setProductsList] = useState<ListTemplate[]>([]);

  useEffect(() => {
    fetch("/getProductsInfo",
    {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: StoreId,
        })
    }).then(res => res.json())
    .then((data: ListTemplate[]) => {
        // const List = ProductsList;
        // List.push(data);
        setProductsList(data);
        // console.log(data);
    })
},[]);

  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Name
              </TableCell>
              <TableCell>
                Price
              </TableCell>
              <TableCell>
                Quantity``
              </TableCell>
              <TableCell>
                Desc
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ProductsList.map((product) => {
              return (
                <TableRow>
                  <TableCell>
                    {product.Name}
                  </TableCell>
                  <TableCell>
                    {product.Price}
                  </TableCell>
                  <TableCell>
                    {product.Quantity}
                  </TableCell>
                  <TableCell>
                    {product.Desc}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Products
