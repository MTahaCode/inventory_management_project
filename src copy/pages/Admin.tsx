import { Box, Drawer, Typography, Button, Container, List, ListItem, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Link, Outlet, Route, Routes, useLocation } from "react-router-dom"
import DehazeIcon from '@mui/icons-material/Dehaze';
import MainLayout from "../layouts/MainLayout";
import { theme, colors } from "../theme";

const Admin = () => {

  const navigate = useNavigate();

  const [SelectedItem, setSelectedItem] = useState(0);
  const [menuItems, setMenuItems] = useState([
    ['Home', ""], 
    ['User Management', "userManagement"], 
    ['Products', "products"], 
    ['Purchases', 'purchases'], 
    ['Transactions', 'transactions']
  ]);
  const [drawer, setDrawer] = useState(false);
  const [Trigger, setTrigger] = useState(false);
  const drawerWidth = 240;


  useEffect(() => {
    // fetch("/getAdminNavLinks")
    // .then(res => res.json())
    // .then(
    //   data => setList(
    //     data.map(
    //       (link: any) => {
    //         return (
    //           <Button onClick={() => {
    //             navigate("store", {
    //               state : {
    //                 id: link._id.toString(),
    //                 name: link.Name,
    //               }
    //             });
    //             // navigate("/admin", { state : { userType:"admin" }});
    //           }}>
    //             {link.Name}
    //           </Button>
    //         );
    //       }
    //     )
    //   )
    // )
    // <Button onClick={() => {
    //   navigate("store", {
    //     state : {
    //       id: link._id.toString(),
    //       name: link.Name,
    //     }
    //   });
    //   // navigate("/admin", { state : { userType:"admin" }});
    // }}>
    //   {link.Name}
    // </Button>

  },[Trigger]);

  const HandleReloading = () => {
    setDrawer(!drawer);
    setTrigger(!Trigger);
  }

  return (
    <MainLayout>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <List>
            {menuItems.map((item, index) => (
              <ListItem
                key={item[0]}
                // button
                onClick={() => setSelectedItem(index)}
                // className={SelectedItem === index ? classes.selected : ''}
                sx={{
                  color: theme.palette.primary.main,
                  backgroundColor: (index === SelectedItem) ? colors.background[500] : "",
                  textAlign: "right",
                  cursor: "pointer",
                }}
                component={Link}
                to={item[1]}
              >
                <ListItemText primary={item[0]} />
              </ListItem>
            ))}
          </List>
          </Drawer>
          <Container
            sx={{
              overflow: "auto",
              height: "100vh",
              display: "flex",
              flexDirection:"column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              backgroundColor: "rgba(0, 24, 57, 0.6)",
            }}
          >
            <Outlet />
          </ Container>
      {/* </Container> */}
    </MainLayout>

    
    // <MainLayout>
    //   <Box
    //     sx={{
    //       overflow: "auto",
    //       height: "100vh",
    //       display: "flex",
    //       flexDirection:"column",
    //       justifyContent: "flex-start",
    //       alignItems: "flex-start",
    //       // border: "2px solid red",
    //       backgroundColor: "rgba(0, 24, 57, 0.6)",
    //     }}>
    //     <Drawer
    //       open={true}
    //     >
    //       <Typography>
    //         asdj;flsd
    //       </Typography>
    //       <Typography>
    //         asdj;flsd
    //       </Typography>
    //       <Typography>
    //         asdj;flsd
    //       </Typography>
    //     </Drawer>
    //     <Box>
    //       Somethingadfasafdfasfasdfsdf
    //     </Box>
    //   </Box>
    //   {/* <Container sx={{
    //       overflow: "auto",
    //       height: "100vh",
    //       display: "flex",
    //       flexDirection:"column",
    //       justifyContent: "flex-start",
    //       alignItems: "flex-start",
    //       // border: "2px solid red",
    //       backgroundColor: "rgba(0, 24, 57, 0.6)",
    //     }}> */}
    //     {/* <Button sx={{margin:"10px 3px 4px 10px"}} onClick={() => HandleReloading()}>
    //       <DehazeIcon/>
    //     </Button> */}
    //     {/* <Drawer
    //       sx={{
    //         width: drawerWidth,
    //         flexShrink: 0,
    //         '& .MuiDrawer-paper': {
    //           width: drawerWidth,
    //           boxSizing: 'border-box',
    //         },
    //       }}
    //       variant="permanent"
    //       anchor="left"
    //     >
    //       <Button sx={{margin:"10px 30px 40px 10px"}} onClick={() => HandleReloading()}>
    //         <DehazeIcon />
    //       </Button> */}
    //       {/* <Button onClick={() => {
    //         navigate("");
    //       }}>Home</Button> */}
    //       {/* {List}
    //     </Drawer>
    //     <Container>
    //       <Outlet />
    //     </Container> */}
    //   {/* </Container> */}
    // </MainLayout>
  )
}

export default Admin
