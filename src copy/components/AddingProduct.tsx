import { Grid, Box, Typography, FormLabel, RadioGroup, FormControlLabel, Radio, Button, colors, Input, InputBase } from '@mui/material'
import React, { useState } from 'react'
import CustomInput from './CustomInput'

interface Props {
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  Trigger: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const AddingProduct: React.FC<Props> = ({ setTrigger, Trigger, setPage }) => {

    const [ProductName, setProductName] = useState("");
    const [Price, setPrice] = useState<number>(0);
    const [Desc, setDesc] = useState("");

    const AddProduct = () => {
      
      fetch("/AdminAddProduct", {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ProductName: ProductName,
            Price: Price,
            Desc: Desc,
        })
      }).then(res => res.json())
      .then(data => {
        alert(data.msg)
        setTrigger(!Trigger);
        setPage(0);
      });

    }

  return (
    <div>
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
                      label="`Product Name"
                      placeholder="Enter Name of Product..."
                      isIconActive={false}
                      Input={setProductName}
                      Type={"text"}
                    />
                    {/* <InputBase /> */}
                    <CustomInput
                      label="Price"
                      placeholder="Enter Price..."
                      isIconActive={false}
                      Input={setPrice}
                      Type={"number"}
                    />
                    <CustomInput
                      label="Desc"
                      placeholder="Enter desc..."
                      isIconActive={false}
                      Input={setDesc}
                      Type={"text"}
                    />
        
                    <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 4, boxShadow: `0 0 20px ${colors.green[500]}` }}
                      onClick={() => {AddProduct()}}
                    >
                        Add Product
                    </Button>
                </Box>
            </Box>
        </Grid>
    </div>
  )
}

export default AddingProduct
