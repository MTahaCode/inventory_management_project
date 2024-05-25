import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
// import Login from "./pages/Login";
// import Admin from "./pages/Admin";
// import Manager from "./pages/Manager";
// import Staff from "./pages/Staff";
// import Store from "./components/Store";
// import AdminHome from "./components/AdminHome"
import Home from "./pages/AdminPages/Home";
import ProductsManagement from "./pages/AdminPages/ProductsManagement";
import PurchasesManagement from "./pages/AdminPages/PurchasesManagement";
import TransactionsManagement from "./pages/AdminPages/TransactionsManagement";
import UserManagement from "./pages/AdminPages/UserManagement";
import Admin from "./pages/Admin";
import CreateUser from "./pages/AdminPages/UserPages/CreateUser"
import UserList from "./pages/AdminPages/UserPages/UserList"
import RoleManagement from "./pages/AdminPages/UserPages/RoleManagement"
import ProductList from "./pages/AdminPages/ProductPages/ProductList";
import CreateProducts from "./pages/AdminPages/ProductPages/CreateProducts"
import POS from "./pages/AdminPages/POS";
import Login from "./pages/Login";
import Staff from "./pages/Staff";
import { BrowserRouter, Link, Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom"

const App: React.FC = () => {

  return (
    <Box>
      <Routes>
        {/* <Route path="/" element={<Login />}/> */}
        <Route path="/" element={<Login />} />
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
          <Route path="pos" element={<POS />}/>
          <Route path="purchases" element={<PurchasesManagement />}/>
          <Route path="transactions" element={<TransactionsManagement />}/>
        </Route>
        {/* <Route path="/manager" element={<Manager />}/>*/}
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