import { Modal, Box, IconButton, Typography, useTheme, useMediaQuery, Button, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { tokens } from "../../../Themes/theme";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../../Components/Header";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";

interface FormProps {
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  Trigger: boolean;
  setIsModalCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Form: React.FC<FormProps> = ({setTrigger, Trigger, setIsModalCollapsed}) => {

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values: any) => {

    const isConfirmed = window.confirm("Are you sure you want to edit this product?")

    if (isConfirmed)
    {
      fetch(process.env.REACT_APP_BACKEND_URL + "/Product", {
        method: "put",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values),
      }).then(
        res => res.json()
      ).then(
        (data) => {
          setTrigger(!Trigger);
          setIsModalCollapsed(true);
          initialValues.name = "";
          initialValues.desc = "";
          initialValues.price = 0;
          initialValues.quantity = 0;
          initialValues.measuring = "";
          initialValues.DbId = "";
        }
      )};
    }

  return (
    <Box m="20px">
      <Box sx={{
        margin:"0em 0em 0em 2em"
      }}>
        <Header title="Edit Product" subtitle="" variant="h3"/>
      </Box>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Measuring Quantity"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.measuring}
                name="measuring"
                error={!!touched.measuring && !!errors.measuring}
                helperText={touched.measuring && errors.measuring}
                sx={{ gridColumn: "span 4" }}
                // disabled
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 4" }}
                // disabled
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Quantity"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.quantity}
                name="quantity"
                error={!!touched.quantity && !!errors.quantity}
                helperText={touched.quantity && errors.quantity}
                sx={{ gridColumn: "span 4" }}
                // disabled
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.desc}
                name="desc"
                error={!!touched.desc && !!errors.desc}
                helperText={touched.desc && errors.desc}
                sx={{ gridColumn: "span 4" }}
                // disabled
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Confirm Edit
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  desc: yup.string().required("required"),
  measuring: yup.string().required("required"),
  price: yup
    .number()
    .required("required"),
  quantity: yup
    .number()
    .required("required"),
  DbId: yup.string().required("required"),
});
const initialValues = {
  name: "",
  desc: "",
  measuring: "",
  price: 0,
  quantity: 0,
  DbId: "",
};

interface ProductProps {
  DbId: string;
  id: number;
  name: string;
  desc: string;
  measuring: string;
  price: number;
  quantity: number;
}

const ProductList = () => {

  const [Trigger, setTrigger] = useState(false);
  const [IsModalCollapsed, setIsModalCollapsed] = useState(true);

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
      name: "Apple",
      desc: "This is an apple",
      measuring: "1 kg",
      price: 100,
      quantity: 0,
    },
    {
      id: 2,
      name: "Mango",
      desc: "This is an mango",
      measuring: "1 kg",
      price: 200,
      quantity: 0,
    },
    {
      id: 3,
      name: "Banana",
      desc: "This is an banana",
      measuring: "1 kg",
      price: 300,
      quantity: 0,
    },
  ];

  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL + "/Product")
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


  const HandleDelete = (row: ProductProps) => {

    const isConfirmed = window.confirm("Are you sure you want to delete this product?")

    if (isConfirmed)
    {
      fetch(`/Product/${row.DbId}`,{
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => res.json())
      .then((data) => {
        setTrigger(!Trigger);
      });
    }
  }

  const HandleEdit = (row: ProductProps) => {
    // console.log(row);
    initialValues.name = row.name;
    initialValues.desc = row.desc;
    initialValues.price = row.price;
    initialValues.quantity = row.quantity;
    initialValues.DbId = row.DbId;
    initialValues.measuring = row.measuring;
    setIsModalCollapsed(false);
  }

  const [ProductsList, setProductsList] = useState<ProductProps[]>([]);
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
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
                        backgroundColor: colors.greenAccent[700],
                        borderRadius:"4px",
                    }}
                >
                    <IconButton>
                        <EditIcon onClick = {() => HandleEdit(row)}/>
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
                        <DeleteIcon onClick = {() => HandleDelete(row)}/>
                    </IconButton>
                </Box>
            </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
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
          <Form setTrigger={setTrigger} Trigger={Trigger} setIsModalCollapsed={setIsModalCollapsed}/>
        </Box>
      </Modal>
      <Header title="Products" subtitle="Manage Products" />
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
        <DataGrid rows={ProductsList} columns={columns} />
        {/* <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} /> */}
      </Box>
    </Box>
  );
};

export default ProductList;
