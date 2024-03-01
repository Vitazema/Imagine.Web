import {
  Badge,
  Box,
  Container,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  styled,
} from "@mui/material"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import NotificationsIcon from "@mui/icons-material/Notifications"
import MenuIcon from "@mui/icons-material/Menu"
import MuiDrawer from "@mui/material/Drawer"
import React, { useEffect, useState } from "react"
import { UserContext } from "../../context/UserContext"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import DashboardNav from "./DashboardNav"
import Profile from "./Profile"
import { useGetUserOrders } from "../../context/UserHooks"
import { signal } from "@preact/signals-react"
import { Order } from "../../@types/Order"
import OrderList from "./OrderList"

const drawerWidth = 200

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
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
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
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
}))

export const orders = signal<Order[]>([])

export const Dashboard = () => {
  const userContext = React.useContext(UserContext)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [open, setOpen] = useState(true)
  const getOrders = useGetUserOrders(userContext.token ?? "")

  if (getOrders.isSuccess && getOrders.data) {
    orders.value = getOrders.data
  }

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const getMenuComponent = (index: number) => {
    switch (index) {
      case 0:
        return <Profile />
      case 1:
        return <OrderList orders={orders.value} />
      default:
        return <Profile />
    }
  }

  useEffect(() => {
    document.title = "AiExpression | Dashboard"
    return () => {
      document.title = "AiExpression"
    }
  }, [])

  return (
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
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
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
        <DashboardNav
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "#f8f8f8",
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {getMenuComponent(selectedIndex)}
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}
