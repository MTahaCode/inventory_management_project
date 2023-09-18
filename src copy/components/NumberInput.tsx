import React, { useState } from "react";
import { TextField, IconButton, InputAdornment, Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

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

interface Props {
    Product: SelectedListTemplate;
    setProductsList: React.Dispatch<React.SetStateAction<ListTemplate[]>>;
    ProductsList: ListTemplate[];
    RemoveFromCart: Function;
    SelectedList: SelectedListTemplate[];
    setTotal: React.Dispatch<React.SetStateAction<number>>;
}

const NumberInput: React.FC<Props> = ({Product, setProductsList, ProductsList, RemoveFromCart, SelectedList, setTotal}) => {
  
    const [value, setValue] = useState<number>(0);

  const handleIncrement = () => {

    if (value >= 0 && value < Product.Quantity)
    {
        // modifiable.Quantity--;

        const NewList = ProductsList.map((product) => {
            if (product.Id === Product.Id)
            {
                product.Quantity--;
            }
            return product;
        })
        setProductsList(NewList);

        // setProductsList(ProductsList.map)
        const NewValue = value + 1;
        Product.Selected = NewValue;

        let Total = 0;
        for (const item of SelectedList)
        {
            Total += item.Selected * item.Price;
        }
        setTotal(Total);

        setValue(NewValue); 
    }
  };

  const handleDecrement = () => {
    if (value > 0) {

        const NewList = ProductsList.map((product) => {
            if (product.Id === Product.Id)
            {
                product.Quantity++;
            }
            return product;
        })
        setProductsList(NewList);

        const NewValue = value - 1;
        Product.Selected = NewValue;

        let Total = 0;
        for (const item of SelectedList)
        {
            Total += item.Selected * item.Price;
        }
        setTotal(Total);

        setValue(NewValue);
    }
  };

  return (
    <Box display={"flex"}>
        <Box display={"flex"} justifyContent={"center"}>
            <TextField
            type="number"
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value, 10))}
            InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    <IconButton size="small" onMouseDown={handleDecrement}>
                    <RemoveIcon />
                    </IconButton>
                </InputAdornment>
                ),
                endAdornment: (
                <InputAdornment position="end">
                    <IconButton size="small" onMouseDown={handleIncrement}>
                    <AddIcon />
                    </IconButton>
                </InputAdornment>
                ),
                inputProps: {
                    readOnly: true,
                    // appearance: "none",
                    style: { 
                        // appearance: "textfield",
                        // border: "2px solid red",
                        textAlign: "center",
                        width: "30%",
                    },
                }
            }}
            inputProps={{ min: 0 }}
            sx={{width: "50%"}}
            />
        </Box>
        {(RemoveFromCart) ? 
            (
                <Box display={"flex"} alignItems={"center"}>
                    <Button 
                        sx={{height: "fit-content"}}
                        variant='contained'
                        onClick={() => {RemoveFromCart(Product, value)}}
                        >
                        Remove
                    </Button>
                </Box>
            )
        :""}
    </Box>
  );
};

export default NumberInput;
