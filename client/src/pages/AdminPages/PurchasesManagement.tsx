import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { tokens } from "../../Themes/theme";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../Components/Header";

const PurchasesList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const mockDataTeam = [
    {
      id: 1,
      date: new Date(),
      product: "Apple",
      quantity: 100,
      unitPrice: 200,
      totalPrice: 20000,
    },
  ];
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    {
      field: "date",
      headerName: "Date of Purchase",
      type:"dateTime",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "product",
      headerName: "Product Purchased",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "unitPrice",
      headerName: "Unit Price",
      type: "number",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      type: "number",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
  ];

  return (
    <Box m="20px">
      <Header title="Purchases" subtitle="Account of all the Purchases" />
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

export default PurchasesList;
