import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Manager from "./pages/Manager";
import Staff from "./pages/Staff";
import Store from "./components/Store";
import AdminHome from "./components/AdminHome"
import Home from "./pages/AdminSubPages/Home";
import Products from "./pages/AdminSubPages/Products";
import Purchases from "./pages/AdminSubPages/Purchases";
import Transactions from "./pages/AdminSubPages/Transactions";
import UserManagement from "./pages/AdminSubPages/UserManagement";
import { BrowserRouter, Link, Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom"

const App: React.FC = () => {

  return (
    <Box>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/admin" element={<Admin />}>
          <Route path="" element={<Home />}/>
          <Route path="userManagement" element={<Products />}/>
          <Route path="products" element={<Purchases />}/>
          <Route path="purchases" element={<Transactions />}/>
          <Route path="transactions" element={<UserManagement />}/>
        </Route>
        <Route path="/manager" element={<Manager />}/>
        <Route path="/staff" element={<Staff />}/>
      </Routes>
    </Box>
  );
};

export default App;

// <MainLayout>
    //   <Box
    //     sx={{
    //       width: {
    //         sm: "90vw",
    //         xs: "90vw",
    //         md: "60vw",
    //         lg: "60vw",
    //         xl: "60vw",
    //       },
    //     }}
    //   >
    //     {/* GRID SYSTEM */}
    //     <Grid container height="90vh">
    //       <SigninPage />

    //       <TitleBox />
    //     </Grid>
    //     {/* GRID SYSTEM END */}
    //   </Box>
    // </MainLayout>