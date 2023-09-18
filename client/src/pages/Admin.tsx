import { useState } from "react";
import { BrowserRouter, Link, Outlet, Route, Routes, useLocation } from "react-router-dom"
import { Theme } from "@mui/material";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { ColorModeContext, useMode } from "../Themes/theme";
import Home from "./AdminPages/Home";
import ProductsManagement from "./AdminPages/ProductsManagement";
import PurchasesManagement from "./AdminPages/PurchasesManagement";
import TransactionsManagement from "./AdminPages/TransactionsManagement";
import UserManagement from "./AdminPages/UserManagement";
import NavSidebar from "../Components/NavSidebar";
import Topbar from "../Components/Topbar";

const Admin = () => {

    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

    return (
        <ColorModeContext.Provider value={colorMode as { toggleColorMode: () => void}}>
            <ThemeProvider theme={theme as Theme}>
                <CssBaseline />
                <div style={{display:"flex"}}>
                    <NavSidebar />
                    <main style={{width:"100%"}}>
                        <Topbar />
                        <Outlet />
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
        // <div>
        //     <NavSidebar />
        
        // </div>
    )
}

export default Admin
