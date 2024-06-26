import { Box, Button, Checkbox, colors, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useState, useEffect } from "react";
import CustomInput from "./CustomInput";
import { useNavigate } from "react-router-dom";

const SigninPage: React.FC = () => {

  const navigate = useNavigate();

  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");

  const Login = () => {
    const Credentials = {
      name: UserName,
      password: Password,
    }

    fetch(process.env.REACT_APP_BACKEND_URL + "/User/login", {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(Credentials)
    }).then(
        res => res.json()
    ).then(
        data => {
            if (data.User === "admin" || data.User === "manager" )
            {
                navigate("/admin", { state : { userType:"admin" }});
            }
            // else if (data.User === "manager")
            // {
            //     navigate("/manager", 
            //       { state : { 
            //           userType:"manager",
            //           storeId: data.StoreId,
            //       }});
            // }
            else if (data.User === "staff")
            {
                navigate("/staff", 
                { state : { 
                    userType:"staff",
                    storeId: data.storeId
                }});
            }
            else {
              alert("username or password is wrong")
            }
        }
    ).catch(error => {
        console.log(error);
    })
    }

  useEffect(() => {

    console.log("UserName: ", UserName, " Password: ", Password);

  },[UserName, Password])

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
            {/* LOGO */}
            {/* <Box
              sx={{
                mt: "60px",
                width: "50px",
                height: "50px",
                bgcolor: "primary.main",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 20px ${colors.green[500]}`,
              }}
            >
              <Typography variant="h6" fontWeight="bold" color="white">
                AA
              </Typography>
            </Box> */}
            {/* LOGO END */}

            <Typography color="white" fontWeight="bold" mt={7} mb={3}>
              Sign in to dashboard
            </Typography>
          </Box>

          {/* INPUTS */}
          <CustomInput
            label="Login"
            placeholder="Enter your login..."
            isIconActive={false}
            Input={setUserName}
            Type={"text"}
          />
          <CustomInput
            label="Password"
            placeholder="Enter your password..."
            isIconActive={true}
            Input={setPassword}
            Type={"text"}
          />
          {/* <CustomInput
            label="MFA Code"
            placeholder="Enter your code..."
            isIconActive={true}
          /> */}
          {/* INPUT END */}

          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            mt={2}
            width="100%"
            color="white"
          >
            <div style={{ display: "flex" }}>
              <Checkbox disableRipple sx={{ p: 0, pr: 1 }} />
              <Typography>Remember me</Typography>
            </div>
            <a
              href="#yoyo"
              style={{
                color: colors.green[500],
                textDecoration: "none",
              }}
            >
              Forget password?
            </a>
          </Box>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 4, boxShadow: `0 0 20px ${colors.green[500]}` }}
            onClick={() => {Login()}}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default SigninPage;
