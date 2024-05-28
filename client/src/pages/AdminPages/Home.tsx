import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { tokens } from '../../Themes/theme'
import StatBox from '../../Components/StatBox'
import EmailIcon from "@mui/icons-material/Email";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from '../../Components/Header';
import ProgressCircle from '../../Components/ProgressCircle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LineChart from '../../Components/LineChart';
import dayjs from 'dayjs';

interface GraphCol {
  date: String;
  transactionCount: Number;
}

interface GraphDataProps {
  id: string;
  color: string;
  data: GraphCol[];
}

const Home = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [date,setDate] = useState<dayjs.Dayjs | null>(dayjs());

  const [GraphEnteries,setGraphEnteries] = useState<GraphDataProps[]>([]);
  const [Revenue, setRevenue] = useState<number>();

  const [TotalSales, setTotalSales] = useState<number>(0);
  const [NetProfit, setNetProfit] = useState<number>(0);

  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL + "/POS/revenue")
    .then(res => res.json())
    .then((data: { Revenue: number, result: GraphCol[] } ) => {

      const Required = [{
        id: "Revenue",
        color: tokens("dark").greenAccent[500],
        data: data.result,
      }]

      setRevenue(data.Revenue);

      setGraphEnteries(Required);
    })
  },[]);

  useEffect(() => {
    fetch(`/POS/${date}`)
    .then(res => res.json())
    .then((data: { Transactions: number, NetProfit: number }) => {
      setTotalSales(data.Transactions);
      setNetProfit(data.NetProfit);
      // console.log(data);
    });
  },[date]);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box>
        <Box sx={{
            margin:"2em",
            width:"90%",
            display:"flex",
            justifyContent:"flex-end",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Basic date picker" value={date} onChange={(newDate) => {
                setDate(newDate ? dayjs(newDate) : null);
              }}/>
          </LocalizationProvider>
        </Box>
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
        >
          {/* ROW 1 */}
          <Box
            sx={{
              gridColumn:"span 3",
              backgroundColor:colors.primary[400],
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
            }}
          >
            <StatBox
              title={`${TotalSales}`}
              subtitle="Total Sales"
              progress="0.75"
              increase=""
              icon={
                <EmailIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            sx={{
              gridColumn:"span 3",
              backgroundColor:colors.primary[400],
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
            }}
          >
            <StatBox
              title={`${TotalSales}`}
              subtitle="Total Purchases"
              progress="0.50"
              increase="+21%"
              icon={
                <PointOfSaleIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            sx={{
              gridColumn:"span 3",
              backgroundColor:colors.primary[400],
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
            }}
          >
            <StatBox
              title={`${NetProfit}`}
              subtitle="Net Profit"
              progress="0.30"
              increase="+5%"
              icon={
                <PersonAddIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>

          {/* ROW 2 */}
          <Box
            sx={{
              gridColumn:"span 8",
              gridRow:"span 2",
              backgroundColor:colors.primary[400],
            }}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                  Revenue for the last week
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color={colors.greenAccent[500]}
                >
                  {`Rs ${Revenue}`}
                </Typography>
              </Box>
              <Box>
                <IconButton>
                  <DownloadOutlinedIcon
                    sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                  />
                </IconButton>
              </Box>
            </Box>
            <Box height="250px" m="-20px 0 0 0">
              <LineChart isDashboard={true} GraphEnteries={GraphEnteries}/>
            </Box>
          </Box>
          {/* <Box
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
                justifyContent:"space-between",
                alignItems:"center",
                borderBottom:`4px solid ${colors.primary[500]}`,
                colors:colors.grey[100],
                p:"15px",
              }}
            >
              <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                Delivery Requests
              </Typography>
            </Box>
            {/* {mockTransactions.map((transaction, i) => (
              <Box
                key={`${transaction.txId}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {transaction.txId}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {transaction.user}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>{transaction.date}</Box>
                <Box
                  backgroundColor={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  ${transaction.cost}
                </Box>
              </Box>
            ))} */}
          {/*</Box> */}

          {/* ROW 3 */}
          {/* <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            p="30px"
          >
            <Typography variant="h5" fontWeight="600">
              Campaign
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px"
            >
              <ProgressCircle size="125" />
              <Typography
                variant="h5"
                color={colors.greenAccent[500]}
                sx={{ mt: "15px" }}
              >
                $48,352 revenue generated
              </Typography>
              <Typography>Includes extra misc expenditures and costs</Typography>
            </Box>
          </Box> */}
          {/* <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ padding: "30px 30px 0 30px" }}
            >
              Sales Quantity
            </Typography>
            <Box height="250px" mt="-20px">
              <BarChart isDashboard={true} />
            </Box>
          </Box> */}
          {/* <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            padding="30px"
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ marginBottom: "15px" }}
            >
              Geography Based Traffic
            </Typography>
            <Box height="200px">
              <GeographyChart isDashboard={true} />
            </Box>
          </Box> */}
        </Box>
      </Box>
    </Box>
  );
}

export default Home
