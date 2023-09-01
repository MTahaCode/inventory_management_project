import { Box, Typography, Paper, Button } from "@mui/material"
import { useEffect, useState} from "react"
import AddingEmployee from "../components/AddingEmployee"

interface WorkersProps {
    StoreId: number;
    UserType: string;
}

interface workers {
    Id: string,
    Name: string,
    Role: string,
}

const Workers: React.FC<WorkersProps> = ({StoreId, UserType}) => {

    const [workersList,setWorkersList] = useState<workers[]>([]);
    const [Trigger, setTrigger] = useState<boolean>(false);
    const [Page, setPage] = useState<number>(0);

    useEffect(() => {
        fetch("/getWorkersInfo",
        {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: StoreId,
            })
        }).then(res => res.json())
        .then((data) => {
            setWorkersList(data)
            // console.log(data);
        })
    },[Trigger]);

    const fire = (Id: string) => {
        fetch("/DeleteEmployee",
        {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                UserId: Id,
                StoreId: StoreId,
            })
        }).then(res => res.json())
        .then((data) => {
            setTrigger(!Trigger);
        })
    }

    return (
        <Box margin={"20px"} display={"flex"} flexDirection={"column"} >
            {
                (Page === 0) && (
                    <Box>
                        <Box display={"flex"} justifyContent={"center"}>
                            <Button variant="contained" onClick = {() => {setPage(1)}}>
                                Add Employee
                            </Button>
                        </Box>
                        <Typography variant="h5" color={"primary.dark"}>
                            Manager
                        </Typography>
                        {workersList.filter((worker) => worker.Role === "manager").map((worker) => {
                            return (
                                <Paper sx={{padding: "1em 2em 1em 2em", margin: "0em 0em 1em 0em", display: "flex", justifyContent:"space-between"}}>
                                    <Box sx={{display: "flex", alignItems: "center", gap:"1em"}}>
                                        <Typography variant='h6' color={"primary"}>
                                            Name: 
                                        </Typography>
                                        <Typography>
                                            {worker.Name}
                                        </Typography>
                                    </Box>
                                    {
                                        (UserType === "Admin") && (
                                            <Button onClick={() => {fire(worker.Id)}}>
                                                Fire
                                            </Button>
                                        )
                                    }
                                </Paper>
                            )
                        })}
                        <Typography variant="h5" color={"primary.dark"}>
                            Staff
                        </Typography>
                        {workersList.filter((worker) => worker.Role === "staff").map((worker) => {
                            return (
                                <Paper sx={{padding: "1em 2em 1em 2em", margin: "0em 0em 1em 0em", display: "flex", justifyContent:"space-between"}}>
                                    <Box sx={{display: "flex", alignItems: "center", gap:"1em"}}>
                                        <Typography variant='h6' color={"primary"}>
                                            Name: 
                                        </Typography>
                                        <Typography>
                                            {worker.Name}
                                        </Typography>
                                    </Box>
                                    <Button onClick={() => {fire(worker.Id)}}>
                                        Fire
                                    </Button>
                                </Paper>
                            )
                        })}
                    </Box>
                )
            }
            {
                (Page === 1) && (
                    <Box>
                        <AddingEmployee StoreId={StoreId} setPage={setPage} setTrigger={setTrigger} Trigger={Trigger} UserType={UserType}/>
                        <Button onClick={() => setPage(0)}>
                            Go Back
                        </Button>
                    </Box>
                )
            }
        </Box>
    )
}

export default Workers
