import React, { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemText from "@mui/material/ListItemText";
import CircularProgress from "@mui/material/CircularProgress";
import WashmeLogo from "../assets/WashmeLogo.jpg";
import { Link, Redirect } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { Bar } from "react-chartjs-2";
import AuthService from "../services/authService";
import UserService from "../services/userService";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: "black",
  backgroundColor: "white",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    color: "black",
    backgroundColor: "#FFDB00",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const columns = [
  {
    title: "Machine Id",
    dataIndex: "Device_ID",
    key: "Device_ID",
  },
  {
    title: "Income",
    dataIndex: "Income",
    key: "Income",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
  },
];

const DashBoard = () => {
  const [open, setOpen] = useState(true);
  const [sendRedirect, setSendRedirect] = useState(false);
  const [tableData, setTableData] = useState([]);
  const labelId = [];
  const numChart = [];

  const chartData = {
    labels: labelId,
    datasets: [
      {
        label: "Income ฿",
        data: numChart,
        backgroundColor: "rgba(255, 143, 0, 0.83)",
        barPercentage: 0.5,
        borderRadius: 4,
        categoryPercentage: 0.5,
        maxBarThickness: 10,
      },
    ],
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const getBranchUrl = AuthService.getCurrentUser();

    const { branch } = getBranchUrl;

    UserService.getUserBoard(branch).then(
      (res) => {
        setTableData(res.data);
      },
      (error) => {
        if (
          error.response ||
          error.response.status === 401 ||
          error.response.status === 403 ||
          error.response.status === 500
        ) {
          setSendRedirect(true);
          AuthService.logout();
        }
      }
    );
  }, []);

  tableData.map((value, key) => {
    mapData(value, key);
  });
  function mapData(value, key) {
    labelId.push(value.Device_ID.toString());
    numChart.push(value.Income);
  }

  return (
    <ThemeProvider theme={mdTheme}>
      {sendRedirect && <Redirect to="/" />}
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              WASH ME
            </Typography>

            <Badge color="secondary">
              <img
                style={{ margin: 10, width: "3rem" }}
                src={WashmeLogo}
                alt="WashmeLogo"
              />
            </Badge>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            <ListItem button component={Link} to={"/dashboard"}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to={"/"}
              onClick={() => AuthService.logout()}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Sign out" />
            </ListItem>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) => theme.palette.grey[100],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3} direction="row" justifyContent="center">
              {/* table */}
              <Grid item xs={10} md={12} wrap="wrap">
                <Paper
                  sx={{
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <h4 align="center" style={{ fontSize: "20px" }}>
                    Summary data
                  </h4>
                  {tableData.length === 0 ? (
                    <CircularProgress
                      style={{
                        color: "orange",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    />
                  ) : (
                    <Table columns={columns} dataSource={tableData} />
                  )}
                </Paper>
              </Grid>

              {/* chart */}
              <Grid item xs={10} md={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <h4 align="center" style={{ fontSize: "20px" }}>
                    Income chart
                  </h4>
                  <Bar data={chartData} options={options} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DashBoard;
