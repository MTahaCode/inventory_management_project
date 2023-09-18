import React, { useEffect, useState } from 'react'
import { Box, Typography, Paper, Button } from "@mui/material"

interface ListTemplate {
    RequestId: string;
    StoreId: string;
    StoreName: string;
    ProductId: string;
    ProductName: string;

}

const DeliveryRequests: React.FC = () => {

    const [Requests, setRequests] = useState<ListTemplate[]>([]);

    const [TriggerEffect, setTriggerEffect] = useState(false);

    // const [ar, setar] = useState<number[]>([1,2,3,4]);

    useEffect(() => {
        fetch("/GetDeliveryRequests")
        .then(res => res.json())
        .then(data => {
            setRequests(data);
            console.log(data)
        })
    },[TriggerEffect])

    const AcceptRequest = (id: string) => {
        fetch("/AcceptRequest",  {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
            }),
        }).then(res => res.json())
        .then((data) => setTriggerEffect(!TriggerEffect));
    }

    const RejectRequest = (id: string) => {
        fetch("/RejectRequest",  {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
            }),
        }).then(res => res.json())
        .then((data) => setTriggerEffect(!TriggerEffect));
    }

    return (
        <Box>
            <Typography variant='h5' color="primary">
                Delivery Requests
            </Typography>
            {
                (Requests.length > 0) ? (
                Requests.map((request) => {
                    return (
                        <Paper sx={{padding: "1em 1em 1em 2em", margin: "0em 0em 1em 0em", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                            <Box>
                                <Box sx={{display: "flex", alignItems: "center", gap:"1em"}}>
                                    <Typography variant='h6' color={"primary"}>
                                        Store:
                                    </Typography>
                                    <Typography>
                                        {request.StoreName}
                                    </Typography>
                                </Box>
                                <Box sx={{display: "flex", alignItems: "center", gap:"1em"}}>
                                    <Typography variant='h6' color={"primary"}>
                                        Product: 
                                    </Typography>
                                    <Typography>
                                        {request.ProductName}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box>
                                <Button onClick={() => {AcceptRequest(request.RequestId)}}>
                                    Accept
                                </Button>
                                <Button onClick={() => {RejectRequest(request.RequestId)}}>
                                    Reject
                                </Button>
                            </Box>
                        </Paper>
                    )
                })
                ) : (
                    <Typography variant='h6' color={"primary.dark"}>
                        No Request
                    </Typography>
                )
            }
        </Box>
    )
}

export default DeliveryRequests
