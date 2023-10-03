import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { tokens } from "../../../Themes/theme";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../../Components/Header";

const UserList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const mockDataTeam = [
    {
      id: 1,
      name: "Super Admin",
      description: "The Ultimate Ruler of the software",
      permission: "Everything",
    //   email: "jonsnow@gmail.com",
    //   age: 35,
    //   phone: "(665)121-5454",
    //   access: "admin",
    },
    {
        id: 2,
        name: "Admin",
        description: "Less than super",
        permission: "Everything except changing admin",
      //   email: "jonsnow@gmail.com",
      //   age: 35,
      //   phone: "(665)121-5454",
      //   access: "admin",
    },
    {
        id: 3,
        name: "Manager",
        description: "Nerfed Down version of Admin",
        permission: "Deliveries, Stock, Users",
      //   email: "jonsnow@gmail.com",
      //   age: 35,
      //   phone: "(665)121-5454",
      //   access: "admin",
    },
    {
        id: 4,
        name: "Staff",
        description: "Stand at counter",
        permission: "Point of Sale",
      //   email: "jonsnow@gmail.com",
      //   age: 35,
      //   phone: "(665)121-5454",
      //   access: "admin",
    },
  ];
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "description",
      headerName: "Description",
      type: "number",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "permission",
      headerName: "Permissions",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }: {row: {access: string}}) => {
        return (
            <Box 
                sx={{
                    display:"flex",
                    gap:"1em",
                }}
            >
                <Box
                    sx={{
                        width:"50%",
                        m:"0 auto",
                        p:"5px",
                        display:"flex",
                        justifyContent:"center",
                        backgroundColor: colors.greenAccent[700]
                            // access === "admin"
                            // ? colors.greenAccent[600]
                            // : access === "manager"
                            // ? colors.greenAccent[700]
                            // : colors.greenAccent[700]
                        ,
                        borderRadius:"4px",
                    }}
                >
                    <IconButton>
                        <EditIcon />
                    </IconButton>
                </Box>
                <Box
                sx={{
                    width:"50%",
                    m:"0 auto",
                    p:"5px",
                    display:"flex",
                    justifyContent:"center",
                    backgroundColor: colors.greenAccent[700]
                        // access === "admin"
                        //     ? colors.greenAccent[600]
                        //     : access === "manager"
                        //     ? colors.greenAccent[700]
                        //     : colors.greenAccent[700]
                    ,
                    borderRadius:"4px",
                }}
                >
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Roles" subtitle="Manage Roles" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />
        {/* <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} /> */}
      </Box>
    </Box>
  );
};

export default UserList;
