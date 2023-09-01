import { Box, Grid, Typography, Checkbox, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, colors } from '@mui/material'
import CustomInput from "../components/CustomInput"
import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

interface Props {
    StoreId: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
    Trigger: boolean;
    UserType: string;
}

const AddingEmployee: React.FC<Props> = ({StoreId, setPage, setTrigger, Trigger, UserType}) => {

    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    const [Role, setRole] = useState("staff");

    useEffect(() => {
        console.log("UserName: ", UserName);
        console.log("Password: ", Password);
        console.log("Role: ", Role);
    },[UserName,Password,Role])
  
    const Register = () => {

        const Credentials = {
                storeId: StoreId,
                name: UserName,
                password: Password,
                role: Role,
              }

        fetch("/Register", {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Credentials),
        }).then(res => res.json())
        .then((data) => {
            setTrigger(!Trigger);
            setPage(0);
            alert(data.msg);
        })
    }
  
    return (
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
                Add a new Employee
              </Typography>
            </Box>
  
            {/* INPUTS */}
            <CustomInput
              label="Employee Name"
              placeholder="Enter Name of User..."
              isIconActive={false}
              Input={setUserName}
              Type={"text"}
            />
            <CustomInput
              label="Password"
              placeholder="Enter password..."
              isIconActive={true}
              Input={setPassword}
              Type={"text"}
            />
  
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              mt={2}
              width="100%"
              color="white"
              padding={"1em 0em 1em 0em"}
            >
                <FormLabel component="legend">Select Role: </FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="staff"
                    name="radio-buttons-group"
                    sx={{color:"white"}}
                    onChange={(event) => {setRole(event.target.value)}}
                >
                {
                  (UserType === "Admin") && (
                    <FormControlLabel value="manager" control={<Radio />} label="Manager" />
                  )
                }
                  <FormControlLabel value="staff" control={<Radio />} label="Staff" />
                </RadioGroup>
            </Box>
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 4, boxShadow: `0 0 20px ${colors.green[500]}` }}
              onClick={() => {Register()}}
            >
              Add Employee
            </Button>
          </Box>
        </Box>
      </Grid>
    );
  };
  
  export default AddingEmployee;