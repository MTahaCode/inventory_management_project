import { Box, IconButton, Typography, useTheme, Modal } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { tokens } from "../../Themes/theme";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseIcon from '@mui/icons-material/Close';
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../Components/Header";
import { useEffect, useState } from "react";

interface listOfItems {
    Name: string;
    UnitPrice: number;
    Quantity: number;
}

interface TransactionProps {
  ListOfItems: listOfItems[];
  Date: string;
  Time: string;
  Total: number;
}

const TransactionsList = () => {
  
  const [IsModalCollapsed, setIsModalCollapsed] = useState(false);
  //change the datatype of row
  //add the product list from the database
  //can also add the date and custimer name

  const [TransactionsList,setTransactionsList] = useState<TransactionProps[]>([]);

  const [Selected, setSelected] = useState<listOfItems[]>([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL + "/POS")
    .then(res => res.json())
    .then((data: TransactionProps[]) => {
      console.log(data);

      const dataWithIds = data.map((item, index) => {
        return {
          id: index+1,
          ...item,
        }
      })
      console.log(dataWithIds);
      setTransactionsList(dataWithIds);
    });
  },[]);

  const HandleModal = (row: TransactionProps) => {
    // console.log(row);

    const List = row.ListOfItems.map((item, index) => {
      return {
        id: index+1,
        ...item,
      }
    })

    console.log(List);

    setSelected(List);
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
  // const mockDataTeam = [
  //   {
  //     id: 1,
  //     date: new Date(),
  //     product: "Apple",
  //     quantity: 100,
  //     unitPrice: 200,
  //     totalPrice: 20000,
  //   },
  // ];
  const columnsForTransactions: GridColDef[] = [
    { field: "id", headerName: "ID" },
    {
      field: "Date",
      headerName: "Date of Purchase",
      type:"string",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Time",
      headerName: "Time of Purchase",
      type:"string",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    // {
    //   field: "customer",
    //   headerName: "Customer",
    //   flex: 1,
    //   headerAlign: "left",
    //   align: "left",
    // },
    {
      field: "Total",
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
    { field: "id", headerName: "Id" },
    {
      field: "Name",
      headerName: "Product",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Quantity",
      headerName: "Quantity",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "UnitPrice",
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
      valueGetter: (params) => {
        const quantity = params.row.Quantity;
        const price = params.row.UnitPrice;
        return quantity * price;
      }
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
            <DataGrid rows={Selected} columns={columnsForProducts} />
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
        <DataGrid rows={TransactionsList} columns={columnsForTransactions} />
        {/* <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} /> */}
      </Box>
    </Box>
  );
};

export default TransactionsList;
