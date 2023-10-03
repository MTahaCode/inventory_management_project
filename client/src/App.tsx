import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
// import Login from "./pages/Login";
// import Admin from "./pages/Admin";
// import Manager from "./pages/Manager";
// import Staff from "./pages/Staff";
// import Store from "./components/Store";
// import AdminHome from "./components/AdminHome"
import Home from "./Pages/AdminPages/Home";
import ProductsManagement from "./Pages/AdminPages/ProductsManagement";
import PurchasesManagement from "./Pages/AdminPages/PurchasesManagement";
import TransactionsManagement from "./Pages/AdminPages/TransactionsManagement";
import UserManagement from "./Pages/AdminPages/UserManagement";
import Admin from "./Pages/Admin";
import CreateUser from "./Pages/AdminPages/UserPages/CreateUser"
import UserList from "./Pages/AdminPages/UserPages/UserList"
import RoleManagement from "./Pages/AdminPages/UserPages/RoleManagement"
import ProductList from "./Pages/AdminPages/ProductPages/ProductList";
import CreateProducts from "./Pages/AdminPages/ProductPages/CreateProducts"
import { BrowserRouter, Link, Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom"

const App: React.FC = () => {

  return (
    <Box>
      <Routes>
        {/* <Route path="/" element={<Login />}/> */}
        <Route path="/admin" element={<Admin />}>
          <Route path="" element={<Home />}/>
          <Route path="userManagement" element={<UserManagement />}>
            <Route path="userList" element={<UserList />}/>
            <Route path="createUser" element={<CreateUser />}/>
            <Route path="roleManagement" element={<RoleManagement />}/>
          </Route>
          <Route path="products" element={<ProductsManagement />}>
            <Route path="productList" element={<ProductList />}/>
            <Route path="createProduct" element={<CreateProducts />}/>
          </Route>
          <Route path="purchases" element={<PurchasesManagement />}/>
          <Route path="transactions" element={<TransactionsManagement />}/>
        </Route>
        {/* <Route path="/manager" element={<Manager />}/>
        <Route path="/staff" element={<Staff />}/> */}
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