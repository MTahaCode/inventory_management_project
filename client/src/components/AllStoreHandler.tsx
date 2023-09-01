import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddingStores from './AddingStores';

interface ListItems {
    _id: string;
    Name: string;
    Location: string;
    Workers: string[];
    Products: {
        id: string;
        quantity: number;
    }[];
}

const AllStoreHandler = () => {

    const [Stores, setStores] = useState<ListItems[]>([]);
    const [Page, setPage] = useState(0);
    const [Trigger, setTrigger] = useState(false);

    useEffect(() => {
        fetch("getAdminNavLinks")
        .then(res=> res.json())
        .then(data => {setStores(data); console.log(data)});
    },[Trigger]);

    const RemoveStore = (id: string) => {
        fetch("/RemoveStoreRecord", {
            method: 'delete',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                StoreId: id,
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
                                Add Store
                            </Button>
                        </Box>
                        <Typography variant="h4" color={"primary"} padding={"2em 0em 1em 0em"}>
                            All Stores
                        </Typography>
                        <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Name
                                </TableCell>
                                <TableCell>
                                    Location
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {Stores.map((store) => {
                            return (
                                <TableRow>
                                    <TableCell>
                                        {store.Name}
                                    </TableCell>
                                    <TableCell>
                                        {store.Location}
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => RemoveStore(store._id.toString())}>
                                        {/* <Button> */}
                                            Delete
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
                        <AddingStores setTrigger={setTrigger} Trigger={Trigger} setPage={setPage}/>
                        <Button onClick={() => setPage(0)}>
                            Go Back
                        </Button>
                    </Box>
                )
            }
        </Box>
    )
}

export default AllStoreHandler
