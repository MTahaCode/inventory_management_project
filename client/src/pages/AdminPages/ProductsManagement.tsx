import { Box, Button, IconButton, InputBase, Typography, useTheme, InputLabel } from '@mui/material'
import { tokens } from '../../Themes/theme'
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from '@mui/icons-material/Person';
import CreateUser from "./UserPages/CreateUser"
import { Outlet } from 'react-router-dom';
import Header from "../../Components/Header";

const ProductsManagement = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div>
      {/* <Box sx={{display:"flex", justifyContent:"space-between"}} p={2}> */}
      <Box sx={{
        margin:"2em 2em 2em 2em"
      }}>
        <Header title="Product Management" subtitle="This is the Product Management Page" variant="h1" />
      </Box>

      <Outlet/>
      {/* <UserList />
      <RolesManagement /> */}
    </div>
  )
}

export default ProductsManagement
