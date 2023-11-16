import { Box, Button, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material'
import { tokens } from '../../Themes/theme'
import React, { useEffect, useState, useRef } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Header from '../../Components/Header';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useReactToPrint } from "react-to-print";
import { Form } from 'formik';

interface ProductProps {
    DbId: string;
    id: number;
    name: string;
    desc: string;
    measuring: string;
    price: number;
    quantity: number;
}

interface ListProps {
    Receipt: ProductProps[];
    setReceipt: React.Dispatch<React.SetStateAction<ProductProps[]>>;
    ProductsList: ProductProps[];
    setProductsList: React.Dispatch<React.SetStateAction<ProductProps[]>>;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
    Trigger: boolean;
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

const List: React.FC<ListProps> = ({Receipt, setReceipt, ProductsList, setProductsList, setTotal, Trigger, setTrigger}) => {

    // const [Trigger, setTrigger] = useState(false);
  
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    useEffect(() => {
      fetch("/Product")
      .then(res => res.json())
      .then(
        (data: ProductProps[]) => {
  
          const List = data.map((product, index) => {
  
            const Req = {
              DbId: product.DbId,
              id: 1+index,
              name: product.name,
              desc: product.desc,
              measuring: product.measuring,
              price: product.price,
              quantity: product.quantity,
            }
  
            console.log(Req);
            return Req;
          })
          // console.log(List);
          setProductsList(List);
          // console.log(data);
          // console.log(List);
        }
      )
    },[Trigger]);


    const HandleAdd = (row: ProductProps) => {

      if (row.quantity <= 0) return;

      ProductsList.forEach((product) => {
        if (product.DbId === row.DbId)
        {
          product.quantity--;
        }
      })

      if (!Receipt.some((receipt) => receipt.DbId === row.DbId))
      {
        setReceipt((prevReceipt) => {
          let Row = {...row, quantity:1};
          return [...Receipt, Row];
        });
      }
      else
      {
        setReceipt((prevReceipt) => {
            const newReceipt = Receipt.map((receipt) => {
            if (receipt.DbId === row.DbId)
            {
              receipt.quantity++;
            }
            return receipt;
          })

          return newReceipt;
        });
      }
    }

    // const [ProductsList, setProductsList] = useState<ProductProps[]>([]);
    const columns: GridColDef[] = [
      { field: "id", headerName: "ID", flex:1},
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        field: "measuring",
        headerName: "Measuring Method",
        flex: 1,
        headerAlign: "left",
        align: "left",
      },
      {
        field: "price",
        headerName: "Price",
        type: "number",
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
        field: "desc",
        headerName: "Description",
        flex: 1,
        headerAlign: "left",
        align: "left",
      },
      {
        field: "furthurActions",
        headerName: "Furthur Actions",
        flex: 1,
        renderCell: (params: any) => {
  
          const { row } = params;
  
          return (
            <Box
                sx={{
                    width:"30%",
                    m:"0 auto",
                    p:"5px",
                    display:"flex",
                    justifyContent:"center",
                    backgroundColor: colors.greenAccent[700],
                    borderRadius:"4px",
                }}
            >
                <IconButton>
                    <AddIcon onClick={() => {HandleAdd(row); console.log(Receipt)}}/>
                </IconButton>
            </Box>
          );
        },
      },
    ];
  
    return (
      <Box m="20px">
        <Box
          m="0px 0 0 0"
          height="75vh"
          width="50vw"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              // fontSize: "1.3em",
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
          <DataGrid rows={ProductsList} columns={columns} />
          {/* <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} /> */}
        </Box>
      </Box>
    );
  };

const initialValues = {
    name: "",
    desc: "",
    measuring: "",
    price: 0,
    quantity: 0,
    DbId: "",
};

interface ReceiptTableProps {
  Total: number;
  Receipt: ProductProps[];
}

const ReceiptTable: React.FC<ReceiptTableProps> = ({Total, Receipt}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Receipt.map((receipt) => (
            <TableRow key={receipt.id}>
              <TableCell>{receipt.id}</TableCell>
              <TableCell>{receipt.name}</TableCell>
              <TableCell align="right">{receipt.price}</TableCell>
              <TableCell align="right">{receipt.quantity}</TableCell>
              <TableCell align="right">{receipt.quantity * receipt.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell colSpan={3}></TableCell>
            <TableCell align="right">Total:</TableCell>
            <TableCell align="right">
              {Total}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const POS = () => {

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

    const [ProductsList, setProductsList] = useState<ProductProps[]>([]);
    const [Receipt, setReceipt] = useState<ProductProps[]>([]);

    const [IsModalCollapsed, setIsModalCollapsed] = useState(true);
    const [Trigger, setTrigger] = useState(false);

    const PDF = useRef();

    const HandleAdd = (row: ProductProps) => {

      const isQuantityZero = ProductsList.some((product) => {
        if (product.DbId === row.DbId && product.quantity <=0)
        {
          return true;
        }
        return false;
      })

      if (isQuantityZero) return;

      ProductsList.forEach((product) => {
        if (product.DbId === row.DbId)
        {
          product.quantity--;
        }
      })

      if (!Receipt.some((receipt) => receipt.DbId === row.DbId))
      {
        setReceipt((prevReceipt) => {
          let Row = {...row, quantity:1};
          return [...Receipt, Row];
        })
      }
      else
      {
        setReceipt((prevReceipt) => {
            const newReceipt = Receipt.map((receipt) => {
            if (receipt.DbId === row.DbId)
            {
              receipt.quantity++;
            }
            return receipt;
          })
          return newReceipt;
        });
      }
    }

    const HandleRemove = (row: ProductProps) => {

      if (row.quantity <= 1) 
      {
        return;
      }

      ProductsList.forEach((product) => {
        if (product.DbId === row.DbId)
        {
          product.quantity++;
        }
      })

      setReceipt((prevReceipt) => {
          let newReceipt = Receipt.map((receipt) => {
          if (receipt.DbId === row.DbId)
          {
            receipt.quantity--;
          }
          return receipt;
          })
          // if (row.quantity <=0)
          // {
          //   newReceipt = newReceipt.filter((receipt) => receipt.DbId !== row.DbId);
          // }

        return newReceipt;
      });
    }

    const DeleteReceiptRow = (row: ProductProps) =>
    {
      setProductsList(() => {
        const NewList = ProductsList.map((product) => {
          if (product.DbId === row.DbId)
          {
            product.quantity += row.quantity;
          }
          return product;
        })

        setReceipt(() => {
          const NewReceipt = Receipt.filter((receipt) => receipt.DbId != row.DbId)
          return NewReceipt;
        });

        return NewList;
      });
    }

    const HandleClear = () => {

      setProductsList((prevList) => {

        const newList = prevList.map((product) => {
          let receipt = Receipt.find(r => r.DbId === product.DbId);
          if (receipt)
          {
            return {...product, quantity: product.quantity + receipt.quantity};
          }
          return product;
        })
        setReceipt([]);
        return newList;
      });

    }

    const generatePDF = useReactToPrint({
      content: () => {
        if (PDF.current) {
          return PDF.current;
        } else {
          return null;
        }
      },
      documentTitle: "Receipt",
      // onAfterPrint: () => alert("After creating pdf"),
    });

    const HandleConfirm = () =>{

      if (Receipt.length === 0) return;

      const isConfirmed = window.confirm("Are you sure you want to confirm?")

      if (isConfirmed)
      {
          Receipt.forEach(async (receipt) => {
          // console.log(receipt);
          await fetch(`/POS`,{
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(receipt),
          })
          .then(res => res.json())
          .then((data) => {
            if (!data) return;
          });
        })

        const ListOfItems = Receipt.map((receipt) => {

          return {
            DbId: receipt.DbId,
            Quantity: receipt.quantity,
          }
        })

        const RequiredInfo = {
          ListOfItems: ListOfItems,
          DateTime: new Date(),
          Total: Total,
        }

        fetch(`/POS`,{
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(RequiredInfo),
        })
        .then(res => res.json())
        .then((data) => {
          setTrigger(!Trigger);
          setIsModalCollapsed(true);
          HandleClear();
        });
      }
    }

    const ReceiptColumns: GridColDef[] = [
      // { field: "id", headerName: "ID" },
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        field: "price",
        headerName: "Price",
        type: "number",
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
        field: "furthurActions",
        headerName: "Furthur Actions",
        flex: 1,
        renderCell: (params: any) => {
  
          const { row } = params;
  
          return (
            <Box 
                sx={{
                    display:"flex",
                    gap:"0.5em",
                }}
            >
                <Box
                    sx={{
                        width:"20%",
                        m:"0 auto",
                        // p:"5px",
                        display:"flex",
                        justifyContent:"center",
                        backgroundColor: colors.greenAccent[700],
                        borderRadius:"4px",
                    }}
                >
                    <IconButton>
                        <AddIcon onClick={() => HandleAdd(row)} />
                    </IconButton>
                </Box>
                <Box
                sx={{
                    width:"20%",
                    m:"0 auto",
                    // p:"5px",
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
                        <RemoveIcon onClick={() => HandleRemove(row)} />
                    </IconButton>
                </Box>
                <Box
                sx={{
                    width:"20%",
                    m:"0 auto",
                    // p:"5px",
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
                        <DeleteIcon onClick={() => DeleteReceiptRow(row)} />
                    </IconButton>
                </Box>
            </Box>
          );
        },
      },
    ]

    const [Total, setTotal] = useState(0);

    useEffect(() => {
      setTotal(() => {
        const totalArray = Receipt.map((receipt) => receipt.price * receipt.quantity);
        if (totalArray.length <= 0) return 0;
        return totalArray.reduce((a,b) => a+b);
      });
    },[Receipt]);

    return (
        <div>
            <Modal
              open={!IsModalCollapsed}
              // onClose={}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalStyle}>
                <Box sx={{
                    display:"flex",
                    // flexDirection:"column",
                    justifyContent:"flex-end",
                }}>
                  <IconButton>
                    <CloseIcon onClick={() => setIsModalCollapsed(true)}/>
                  </IconButton>
                </Box>
                <Box
                  sx={{
                    display:"flex",
                    flexDirection:"column",
                    gap:"1em",
                  }}
                >
                  <Box ref={PDF}>
                    <ReceiptTable Total={Total} Receipt={Receipt}/>
                  </Box>
                  <Box 
                    sx={{
                      display:"flex",
                      gap:"1em",
                    }}
                  >
                    <Button color="secondary" variant="contained"
                      sx={{
                        height:"2em",
                        width:"10em",
                        fontSize:"1em",
                        fontWeight:"600",
                      }}
                      onClick={() => generatePDF()}
                      >
                      Get PDF
                    </Button>
                    <Button color="secondary" variant="contained"
                      sx={{
                        height:"2em",
                        width:"10em",
                        fontSize:"1em",
                        fontWeight:"600",
                      }}
                      onClick={() => HandleConfirm()}
                      >
                      Confirm
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Modal>
            <Header title="Products" subtitle="Manage Products" />
            <Box
                sx={{
                    gridColumn:"span 4",
                    gridRow:"span 2",
                    backgroundColor:colors.primary[500],
                    overflow:"auto",
                    display:"flex",
                    flexDirection:"column"
                }}
            >
                <Box
                    sx={{
                        display:"flex",
                        marginRight:"20px"
                        // border:"2px solid red",
                        // justifyContent:"space-between"
                    }}
                >
                    <List 
                      setTotal={setTotal} 
                      Receipt={Receipt} 
                      setReceipt={setReceipt} 
                      ProductsList={ProductsList} 
                      setProductsList={setProductsList} 
                      Trigger={Trigger} 
                      setTrigger={setTrigger}
                    />
                    <Box
                        width={"35vw"}
                        height={"100%"}
                        marginTop={"20px"}
                        sx={{
                            display:"flex",
                            flexDirection:"column",
                            gap:"2em",
                        }}
                    >
                        <Box 
                          sx={{
                            display:"flex",
                            justifyContent:"center",
                            gap:"3vw",
                            // color: colors.grey[100],
                            // fontSize:"5vw"
                          }}
                        >
                          <Button type="submit" color="secondary" variant="contained"
                            sx={{
                              height:"5vh",
                              width:"20vw",
                              fontSize:"1em",
                              fontWeight:"600",
                            }}
                            onClick={() => (Receipt.length === 0) ? alert("Nothing in receipt"):setIsModalCollapsed(false)}
                          >
                            Generate Receipt
                          </Button>
                          <Button color="secondary" variant="contained"
                            sx={{
                              height:"5vh",
                              width:"20vw",
                              fontSize:"1em",
                              fontWeight:"600",
                            }}
                            onClick={() => HandleClear()}
                          >
                            Clear
                          </Button>
                        </Box>
                        <Box
                            sx={{
                                // gridColumn:"span 4",
                                // gridRow:"span 2",
                                backgroundColor:colors.primary[400],
                                // overflow:"auto",
                                width:"100%",
                                textAlign:"center",
                                display:"flex",
                                // flexDirection:"column",
                                padding:"2em 0em 2em 2em",
                                alignItems:"center",
                                // justifyContent:"center",
                                gap:"5em",
                                
                            }}
                        >
                            {/* <Header title="Total" subtitle="" /> */}
                            <Typography
                                fontSize={"2em"}
                            >
                                Total:
                            </Typography>
                            <Typography
                                fontSize={"5em"}
                            >
                                {`${Total} Rs`}
                            </Typography>
                        </Box>
                          <Box
                              sx={{
                                gridColumn:"span 4",
                                gridRow:"span 2",
                                backgroundColor:colors.primary[400],
                                overflow:"auto",
                              }}
                          >
                              <Box
                                  sx={{
                                    display:"flex",
                                    flexDirection:"column",
                                    justifyContent:"space-between",
                                    alignItems:"center",
                                    borderBottom:`4px solid ${colors.primary[500]}`,
                                    colors:colors.grey[100],
                                    p:"15px",
                                    gap:"2em"
                                  }}
                              >
                                  <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                                      Selected Items
                                  </Typography>
                                  <Box
                                      sx={{
                                          // gridColumn:"span 4",
                                          // gridRow:"span 2",
                                          backgroundColor:colors.primary[400],
                                          // overflow:"auto",
                                          width:"100%"
                                          
                                      }}
                                  >
                                    
                                    <Box
                                      m="0px 0 0 0"
                                      height="41.25vh"
                                      width="100%"
                                      sx={{
                                        display:"flex",
                                        gap: "2em",
                                        justifyContent:"space-around",
                                        color:colors.grey[100],
                                      }}
                                      >
                                      <DataGrid rows={Receipt} columns={ReceiptColumns} />
                                      {/* <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} /> */}
                                    </Box>
                                  </Box>
                              </Box>
                          </Box>
                    </Box>
                </Box>
            </Box>

        </div>
    )
}

export default POS
