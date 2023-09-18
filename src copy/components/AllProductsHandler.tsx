import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AddingProduct from "./AddingProduct"

interface ListTemplate {
    Id: string;
    Name: string;
    Desc: string;
    Price: number;
    Quantity: number;
  }

const AllProductsHandler = () => {

    const [Trigger, setTrigger] = useState(false);

    const [AllProducts, setAllProducts] = useState<ListTemplate[]>([]);
    const [Page, setPage] = useState<number>(0);

    useEffect(() => {
        fetch("/getAllProducts")
        .then(res => res.json())
        .then((data : ListTemplate[]) => {
            setAllProducts(data);
            // console.log(data);
        });  
    },[Trigger])

    const RemoveProduct = (id: string) => {
        fetch("/RemoveProductRecord", {
            method: 'delete',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ProductId: id,
                // StoreId: StoreId,
            })
        }).then(res => res.json())
        .then(data => setTrigger(!Trigger));
    }

    return (
        <Box>
            {
                (Page === 0) && (
                    <TableContainer>
                         <Box display={"flex"} justifyContent={"center"}>
                            <Button variant="contained" onClick = {() => {setPage(1)}}>
                                Add Product
                            </Button>
                        </Box>
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
                        {AllProducts.map((product) => {
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
                                    <Button onClick={() => RemoveProduct(product.Id)}>
                                        Remove
                                    </Button>
                                </TableCell>
                                </TableRow>
                            )
                            })}
                        </TableBody>
                        </Table>
                    </TableContainer>
                )
            }
            {
                (Page === 1) && (
                    <Box>
                        {/* <AddingProducts setPage={setPage} setTrigger={setTrigger} Trigger={Trigger}/> */}
                        <AddingProduct setTrigger={setTrigger} Trigger={Trigger} setPage={setPage}/>
                        <Button onClick={() => setPage(0)}>
                            Go Back
                        </Button>
                    </Box>
                )
            }
        </Box>
    )
}

export default AllProductsHandler
