import { Modal, Box, Button, IconButton, InputLabel, MenuItem, Select, Typography, useTheme, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { tokens } from "../../../Themes/theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../../Components/Header";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

interface FormProps {
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  Trigger: boolean;
  setIsModalCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Form: React.FC<FormProps> = ({setTrigger, Trigger, setIsModalCollapsed}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values: any) => {

    const isConfirmed = window.confirm("Are you sure you want to edit this user?")

    if (isConfirmed)
    {
      fetch("/user", {
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
          initialValues.password = "";
          initialValues.email = "";
          initialValues.store = "First Store";
          initialValues.role = "admin";
          initialValues.DbId = "";
        }
      )};
    }

  return (
    <Box m="20px">
      <Box sx={{
        margin:"0em 0em 0em 2em"
      }}>
        <Header title="Edit User" subtitle="" variant="h3"/>
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
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Store"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.store}
                name="store"
                error={!!touched.store && !!errors.store}
                helperText={touched.store && errors.store}
                sx={{ gridColumn: "span 4" }}
                disabled
              />
              <Select
                fullWidth
                variant="filled"
                type="text"
                label="Role"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.role}
                name="role"
                error={!!touched.role && !!errors.role}
                // helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="staff">Staff</MenuItem>
              </Select>
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

// const phoneRegExp =
//   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  password: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  store: yup
    .string()
    .required("required"),
  role: yup.string().required("required"),
});
const initialValues = {
  name: "",
  password: "",
  email: "",
  store: "First Store",
  role: "admin",
  DbId: "",
};


interface dropDownProps {
  access: string;
}

const DropDownAccess: React.FC<dropDownProps> = ({access}) => {
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedOption, setSelectedOption] = useState(access);

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value);
    access = event.target.value;
  };

  return (
    <div>
        <InputLabel id="dropdown-label">Select an Option</InputLabel>
        <Select
          labelId="dropdown-label"
          id="dropdown"
          value={selectedOption}
          onChange={handleChange}
        >
          {/* {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
          {access === "user" && <LockOpenOutlinedIcon />}*/}
          <MenuItem value="SuperAdmin">
            <AdminPanelSettingsOutlinedIcon />
          </MenuItem>
          <MenuItem value="Admin">
            <AdminPanelSettingsOutlinedIcon />
          </MenuItem>
          <MenuItem value="Manager">
            <SecurityOutlinedIcon />
          </MenuItem>
          <MenuItem value="Staff">
            <LockOpenOutlinedIcon />
          </MenuItem>
        </Select>
        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
        </Typography>
    </div>
  );
}

interface userListProps {
  id: number;
  DbId: string;
  Name: string;
  Password: string;
  Role: string;
  Store: string;
  Email: string;
}

const UserList = () => {
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
  const [UserList, setUserList] = useState<userListProps[]>([]);
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    {
      field: "Name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Store",
      headerName: "Working in Store",
      flex: 1,
    },
    {
      field: "Email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "Role",
      headerName: "Role",
    //   flex: 1,
      renderCell: (params : any) => {
        const {row} = params;

        return (
          <Box
            onClick={() => console.log("Clicking the action")}
            sx={{
                width:"100%",
                m:"0 auto",
                p:"5px",
                display:"flex",
                justifyContent:"center",
                backgroundColor:
                    row.Role === "admin"
                      ? colors.greenAccent[600]
                      : row.Role === "manager"
                      ? colors.greenAccent[700]
                      : colors.greenAccent[700]
                ,
                borderRadius:"4px",
            }}
          >
            {/* <DropDownAccess access={access} /> */}
            {row.Role === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {row.Role === "manager" && <SecurityOutlinedIcon />}
            {row.Role === "staff" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {row.Role}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "furthurActions",
      headerName: "Furthur Actions",
      flex: 1,
      renderCell: (params : any) => {
        
        const { row } = params;

        if (row.Name !== "Super Admin")
        {
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
                    backgroundColor: colors.greenAccent[700],
                    borderRadius:"4px",
                }}
                >
                    <IconButton>
                        <DeleteIcon onClick = {() => HandleDelete(row)}/>
                    </IconButton>
                </Box>
            </Box>
        );
        }
      },
    },
  ];

  const HandleDelete = (row: userListProps) => {

    const isConfirmed = window.confirm("Are you sure you want to delete this user?")

    if (isConfirmed)
    {
      fetch(`/User/${row.DbId}`)
      .then(res => res.json())
      .then((data) => {
        setTrigger(!Trigger);
      });
    }
  }

  const HandleEdit = (row: userListProps) => {
    initialValues.name = row.Name;
    initialValues.password = row.Password;
    initialValues.email = row.Email;
    initialValues.store = "First Store";
    initialValues.role = row.Role;
    // console.log(row.DbId);
    initialValues.DbId = row.DbId;
    setIsModalCollapsed(false);
  }

  const [IsModalCollapsed, setIsModalCollapsed] = useState(true);

  const [Trigger, setTrigger] = useState(false);
  useEffect(() => {
    fetch("/User")
    .then(res => res.json())
    .then((data : userListProps[]) => {
      const RequiredInfo = data.map((user, index) => {

        const Info = {
          id: index+1,
          DbId: user.DbId,
          Name: user.Name,
          Password: user.Password,
          Store: user.Store,
          Email: user.Email,
          Role: user.Role,
        }
        return Info;
      })
      setUserList(RequiredInfo);
    })
  },[Trigger]);

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
      <Header title="TEAM" subtitle="Managing the Team Members" />
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
        <DataGrid rows={UserList} columns={columns} />
        {/* <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} /> */}
      </Box>
    </Box>
  );
};

export default UserList;
