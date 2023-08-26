import { Container, Button, Box, TableContainer, Table, TableHead, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import MainLayout from "../layouts/MainLayout";
import NumberInput from "../components/NumberInput"
import { isFormElement } from 'react-router-dom/dist/dom';

// interface StaffProps {
//   StoreId: number;
// }

interface ListTemplate {
  Id: string;
  Name: string;
  Desc: string;
  Price: number;
  Quantity: number;
}

interface SelectedListTemplate {
  Id: string;
  Name: string;
  Desc: string;
  Price: number;
  Quantity: number;
  Selected: number;
}

const Staff: React.FC = () => {

  const location = useLocation();
 
  const StoreId = location.state.storeId;

  const [ProductsList, setProductsList] = useState<ListTemplate[]>([]);

  const [SelectedList, setSelectedList] = useState<SelectedListTemplate[]>([]);

  const [Total, setTotal] = useState<number>(0);

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
    setSelectedList([]);
  },[]);

  const AddToCart = (product: ListTemplate) => {
    
    let newList = [];
    for (const Product of ProductsList)
    {
      if (Product === product && !SelectedList.some(prod => prod.Id===Product.Id))
      {
        const newProduct = {
          Id: Product.Id,
          Name: Product.Name,
          Desc: Product.Desc,
          Price: Product.Price,
          Quantity: Product.Quantity,
          Selected: 0,
        }

        setSelectedList([...SelectedList, newProduct]);
      }
      newList.push(Product);
    }
    setProductsList(newList);

  }

  const RemoveFromCart = (product: SelectedListTemplate) => {
    
    const NewTotal = Total - (product.Price * product.Selected);
    setTotal(NewTotal);

    setProductsList(ProductsList.map((item) => {
      if (item.Id === product.Id)
      {
        item.Quantity += product.Selected;
        product.Selected = 0;
      }
      return item;
    }))


    setSelectedList(SelectedList.filter((item) => item!== product));
  }

  const ConfirmTransaction = () => {
    console.log("Transaction Confirmed");

    for (const item of ProductsList)
    {

      const payload = {
        StoreId: StoreId,
        Product: item,
      }
      fetch("/ModifyProducts", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
      .then(res => res.json())
      .then((data: {msg: string}) => {
        console.log(data.msg);
        // setSelectedList([]);
        // setTotal(0);
      })
    }

    const SoldProducts = SelectedList.map((item) => {
      return {
        Id: item.Id,
        Quantity: item.Selected,
      }
    })

    const TransactionPayload = {
      StoreId: StoreId,
      Products: SoldProducts,
      DateTime: new Date(),
      TotalPrice: Total,
    }

    fetch("/addTransaction", {
      method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(TransactionPayload),
    }).then(res => res.json())
    .then(data => console.log(data));

  }

  return (
    <MainLayout>
      <Container sx={{
        overflow: "hidden",
        height: "100vh",
        display: "flex",
        flexDirection:"column",
        gap:"5em",
        // justifyContent: "flex-start",
        // alignItems: "flex-start",
        // border: "2px solid red",
        backgroundColor: "rgba(0, 24, 57, 0.6)",
      }}>
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
                  Quantity
                </TableCell>
                <TableCell>
                  Desc
                </TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ProductsList.map((product, index) => {
                return (
                  <TableRow key={`Row-${index}`}>
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
                      <Button 
                        variant='contained'
                        onClick={() => {AddToCart(product)}}
                      >
                        Add
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Box display={"flex"} flexDirection={"column"}>
          <Box sx={{display:"flex", justifyContent:"space-between"}}>
            <Typography variant='h4' color={"white"}>
              Cart
            </Typography>
            <Button disabled={(SelectedList.length > 0 && SelectedList.some((item) => item.Selected>0)) ? false:true} onClick={() => {ConfirmTransaction()}}>
              Confirm Transaction
            </Button>
          </Box>
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
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {SelectedList.map((product, index) => {
                  return (
                    <TableRow key={`Row-${index}`}>
                      <TableCell>
                        {product.Name}
                      </TableCell>
                      <TableCell>
                        {product.Price}
                      </TableCell>
                      <TableCell>
                        <NumberInput 
                          Product={product} 
                          setProductsList={setProductsList} 
                          ProductsList={ProductsList} 
                          RemoveFromCart={RemoveFromCart} 
                          SelectedList={SelectedList}
                          setTotal={setTotal}
                        />
                      </TableCell>
                    </TableRow>
                  )
                })}
                <TableRow>
                  <TableCell>
                    Total Price:
                  </TableCell>
                  <TableCell>
                    {Total}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </MainLayout>
  )
}

export default Staff
