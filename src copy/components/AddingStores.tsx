import { Box, Grid, Typography, Button, colors } from '@mui/material';
import React, { useState } from 'react'
import CustomInput from './CustomInput';

interface Props {
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
    Trigger: boolean;
    setPage: React.Dispatch<React.SetStateAction<number>>;
  }

const AddingStores : React.FC<Props> = ({ setTrigger, Trigger, setPage }) => {

    const [StoreName, setStoreName] = useState("");
    const [Location, setLocation] = useState("");

    const AddProduct = () => {
        fetch("/AdminAddStore", {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                StoreName: StoreName,
                Location: Location,
            })
          }).then(res => res.json())
          .then(data => {
            alert(data.msg)
            setTrigger(!Trigger);
            setPage(0);
          });
    
    }

    return (
        <Box>
            <Grid
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
                minHeight={550}
                sx={{
                boxShadow: {
                    xs: "",
                    sm: "",
                    md: "15px 2px 5px -5px",
                    lg: "15px 2px 5px -5px",
                    xl: "15px 2px 5px -5px",
                },
                }}
            >
                <Box
                sx={{
                    backgroundColor: "rgba(0, 24, 57, 0.2)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100%",
                    borderRadius: {
                    xs: "30px",
                    sm: "30px",
                    md: "30px 0 0 30px",
                    lg: "30px 0 0 30px",
                    xl: "30px 0 0 30px",
                    },
                }}
                display={"flex"}
                justifyContent={"center"}
                >
                <Box width="80%" justifySelf={"center"}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Typography color="white" fontWeight="bold" mt={7} mb={3}>
                            Add a new Product
                        </Typography>
                        </Box>
            
                        {/* INPUTS */}
                        <CustomInput
                        label="Store Name"
                        placeholder="Enter Name of New Store..."
                        isIconActive={false}
                        Input={setStoreName}
                        Type={"text"}
                        />
                        {/* <InputBase /> */}
                        <CustomInput
                        label="Location"
                        placeholder="Enter Location..."
                        isIconActive={false}
                        Input={setLocation}
                        Type={"text"}
                        />
            
                        <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: 4, boxShadow: `0 0 20px ${colors.green[500]}` }}
                        onClick={() => {AddProduct()}}
                        >
                            Add Store
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Box>
    )
}

export default AddingStores
