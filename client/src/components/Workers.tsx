import { Box, Typography } from "@mui/material"
import { useEffect, useState} from "react"

interface WorkersProps {
    StoreId: number;
}

interface workers {
    Id: string,
    Name: string,
    Role: string,
}

const Workers: React.FC<WorkersProps> = ({StoreId}) => {

    const [workersList,setWorkersList] = useState<workers[]>([]);

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
    },[]);

    return (
        <Box margin={"20px"}>
            <Typography variant="h5" color={"primary.dark"}>
                Manager
            </Typography>
            {workersList.filter((worker) => worker.Role === "manager").map((worker) => {
                return (
                    <Typography>
                        {worker.Name}
                    </Typography>
                )
            })}
            <Typography variant="h5" color={"primary.dark"}>
                Staff
            </Typography>
            {workersList.filter((worker) => worker.Role === "staff").map((worker) => {
                return (
                    <Typography>
                        {worker.Name}
                    </Typography>
                )
            })}
        </Box>
    )
}

export default Workers
