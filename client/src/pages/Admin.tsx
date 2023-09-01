import { Box, Drawer, Typography, Button, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Link, Outlet, Route, Routes, useLocation } from "react-router-dom"
import DehazeIcon from '@mui/icons-material/Dehaze';
import MainLayout from "../layouts/MainLayout";


const Admin = () => {

  const navigate = useNavigate();

  //nav
  const [List, setList] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const [Trigger, setTrigger] = useState(false);


  useEffect(() => {
    fetch("/getAdminNavLinks")
    .then(res => res.json())
    .then(
      data => setList(
        data.map(
          (link: any) => {
            return (
              <Button onClick={() => {
                navigate("store", {
                  state : {
                    id: link._id.toString(),
                    name: link.Name,
                  }
                });
                // navigate("/admin", { state : { userType:"admin" }});
              }}>
                {link.Name}
              </Button>
            );
          }
        )
      )
    )

  },[Trigger]);

  const HandleReloading = () => {
    setDrawer(!drawer);
    setTrigger(!Trigger);
  }

  return (
    <MainLayout>
      <Container sx={{
          overflow: "auto",
          height: "100vh",
          display: "flex",
          flexDirection:"column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          // border: "2px solid red",
          backgroundColor: "rgba(0, 24, 57, 0.6)",
        }}>
        <Button sx={{margin:"10px 3px 4px 10px"}} onClick={() => HandleReloading()}>
          <DehazeIcon/>
        </Button>
        <Drawer
          // variant="permanent"
          open={drawer}
          elevation={10}
        >
          <Button sx={{margin:"10px 30px 40px 10px"}} onClick={() => HandleReloading()}>
            <DehazeIcon />
          </Button>
          <Button onClick={() => {
            navigate("");
          }}>Home</Button>
          {List}
        </Drawer>
        <Container>
          <Outlet />
        </Container>
      </Container>
    </MainLayout>
  )
}

export default Admin
