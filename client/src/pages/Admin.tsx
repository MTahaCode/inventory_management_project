import { Box, Drawer, Typography, Button, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Link, Outlet, Route, Routes, useLocation } from "react-router-dom"
import DehazeIcon from '@mui/icons-material/Dehaze';

const Admin = () => {

  const navigate = useNavigate();

  //nav
  const [List, setList] = useState([]);
  const [drawer, setDrawer] = useState(false);

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

  },[]);

  return (
    <div>
      <Button sx={{margin:"10px 3px 4px 10px"}} onClick={() => setDrawer(!drawer)}>
        <DehazeIcon/>
      </Button>
      <Drawer
        // variant="permanent"
        open={drawer}
        elevation={10}
      >
        <Button sx={{margin:"10px 30px 40px 10px"}} onClick={() => setDrawer(!drawer)}>
          <DehazeIcon />
        </Button>
        <Button onClick={() => {
          navigate("");
        }}>press</Button>
        {List}
      </Drawer>
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}

export default Admin
