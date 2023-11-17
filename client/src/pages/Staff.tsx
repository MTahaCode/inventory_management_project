import { useState } from "react";
import { BrowserRouter, Link, Outlet, Route, Routes, useLocation } from "react-router-dom"
import { Theme } from "@mui/material";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { ColorModeContext, useMode } from "../Themes/theme";
// import NavSidebar from "../Components/NavSidebar";
import Topbar from "../Components/Topbar";
import POS from "./AdminPages/POS";

const Staff = () => {
    const [theme, colorMode] = useMode();
    // const [isSidebar, setIsSidebar] = useState(true);

    return (
        <ColorModeContext.Provider value={colorMode as { toggleColorMode: () => void}}>
            <ThemeProvider theme={theme as Theme}>
                <CssBaseline />
                <div style={{display:"flex"}}>
                    {/* <NavSidebar /> */}
                    <main style={{width:"100%"}}>
                        <Topbar />
                        <Box sx={{
                            // border:"2px solid red",
                            marginLeft:"5vw"
                        }}>
                            <POS />
                        </Box>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
        // <div>
        //     <NavSidebar />
        
        // </div>
    )
}

export default Staff
