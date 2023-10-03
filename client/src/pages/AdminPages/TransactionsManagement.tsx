import { Box, IconButton, Typography, useTheme, Modal } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { tokens } from "../../Themes/theme";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseIcon from '@mui/icons-material/Close';
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../Components/Header";
import { useState } from "react";

const TransactionsList = () => {
  
  const [IsModalCollapsed, setIsModalCollapsed] = useState(false);
  //change the datatype of row
  //add the product list from the database
  //can also add the date and custimer name
  const HandleModal = (row: any) => {
    console.log(row);
    setIsModalCollapsed(true);
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: colors.primary[400],
    // bgcolor: colors.blueAccent[700],
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
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
  const columnsForTransactions: GridColDef[] = [
    { field: "id", headerName: "ID" },
    {
      field: "date",
      headerName: "Date of Purchase",
      type:"dateTime",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "customer",
      headerName: "Customer",
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
    {
      field: "viewPurchasedItems",
      headerName: "View Purchased Items",
      flex: 1,
      headerAlign: "left",
      align: "left",
      // renderCell: ({ row: { access } }: {row: {access: string}}) => {
      renderCell: (params) => {

        const {row} = params;

        return (
            <Box 
                sx={{
                    display:"flex",
                    gap:"1em",
                }}
            >
                <Box
                    sx={{
                        width:"100%",
                        m:"0 auto",
                        p:"5px",
                        display:"flex",
                        justifyContent:"center",
                        backgroundColor: colors.greenAccent[700],
                        borderRadius:"4px",
                    }}
                >
                    <IconButton>
                        <OpenInFullIcon onClick={() => HandleModal(row)}/>
                    </IconButton>
                </Box>
            </Box>
        );
      },
    },
  ];

  const columnsForProducts: GridColDef[] = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Product",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "unitPrice",
      headerName: "Unit Price",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
  ];

  return (
    <Box m="20px">
      <Modal
        open={IsModalCollapsed}
        // onClose={}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box sx={{
            display:"flex",
            justifyContent:"flex-end",
          }}>
            <IconButton>
              <CloseIcon onClick={() => setIsModalCollapsed(false)}/>
            </IconButton>
          </Box>
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
            <DataGrid checkboxSelection rows={mockDataTeam} columns={columnsForProducts} />
            {/* <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} /> */}
          </Box>
        </Box>
      </Modal>
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
        <DataGrid checkboxSelection rows={mockDataTeam} columns={columnsForTransactions} />
        {/* <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} /> */}
      </Box>
    </Box>
  );
};

export default TransactionsList;
