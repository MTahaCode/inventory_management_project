import { Box, TableContainer, Table, TableHead, TableBody, TableCell, TableRow, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'

interface ProductsProps {
  StoreId: number;
}

interface ListTemplate {
  Id: string;
  Name: string;
  Desc: string;
  Price: number;
  Quantity: number;
}

const Products: React.FC<ProductsProps> = ({StoreId}) => {

  const [Trigger, setTrigger] = useState(false);

  const [ProductsList, setProductsList] = useState<ListTemplate[]>([]);

  const [AllProducts, setAllProducts] = useState<ListTemplate[]>([]);

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

    fetch("/getAllProducts")
    .then(res => res.json())
    .then((data : ListTemplate[]) => {
      setAllProducts(data);
      // console.log(data);
    });
  },[Trigger]);

  const RemoveProductFromStore = (id: string) => {
    fetch("/deleteProductFromStore", {
      method: 'delete',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          ProductId: id,
          StoreId: StoreId,
      })
    }).then(res => res.json())
    .then(data => setTrigger(!Trigger));
  }

  const AddToStore = (id: string) => {
    fetch("/addProductToStore", {
      method: 'post',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          ProductId: id,
          StoreId: StoreId,
      })
    }).then(res => res.json())
    .then(data => setTrigger(!Trigger));
  }

  return (
    <Box>
      <TableContainer>
        <Typography variant="h4" color={"primary"} padding={"2em 0em 1em 0em"}>
          Products Sold In Store
        </Typography>
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
                  <TableCell>
                    <Button onClick = {() => RemoveProductFromStore(product.Id)}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer>
        <Typography variant="h4" color={"primary"} padding={"2em 0em 1em 0em"}>
          All Products Being Sold
        </Typography>
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
                Quantity
              </TableCell>
              <TableCell>
                Desc
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {AllProducts.filter((product) => !(ProductsList.some((storeProduct) => storeProduct.Id === product.Id))).map((product) => {
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
                  <TableCell>
                    <Button onClick={() => {AddToStore(product.Id)}}>
                      Add
                    </Button>
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
