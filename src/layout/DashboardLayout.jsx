import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";

import { useState } from "react";
import { AUTH_KEY } from "../auth/constants";

const drawerWidth = 260;

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    navigate("/login");
  };

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard",
    },
    {
      text: "Employees",
      icon: <PeopleIcon />,
      path: "/employees",
    },
  ];

const drawerContent = (
  <Box
    sx={{
      height: "100%",
      background: "linear-gradient(180deg, #0f172a, #020617)",
      color: "#e5e7eb",
      display: "flex",
      flexDirection: "column",
      paddingTop:"20%"
    }}
  >
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight={700} color="#fff">
        Employee Admin
      </Typography>
      <Typography variant="caption" sx={{ color: "#94a3b8" }}>
        Management Dashboard
      </Typography>
    </Box>

    <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

    <List sx={{ px: 2, mt: 2 }}>
      {menuItems.map((item) => {
        const active = location.pathname === item.path;

        return (
          <ListItemButton
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{
              mb: 1,
              borderRadius: 2,
              px: 2,
              py: 1.2,
              backgroundColor: active
                ? "rgba(255,255,255,0.12)"
                : "transparent",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.08)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 38,
                color: active ? "#fff" : "#94a3b8",
              }}
            >
              {item.icon}
            </ListItemIcon>

            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontSize: 14,
                fontWeight: active ? 600 : 400,
                color: active ? "#fff" : "#cbd5f5",
              }}
            />
          </ListItemButton>
        );
      })}
    </List>

    <Box sx={{ flexGrow: 1 }} />

    <Box sx={{ p: 2 }}>
      <Button
        fullWidth
        variant="outlined"
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
        sx={{
          color: "#fca5a5",
          borderColor: "rgba(255,255,255,0.2)",
          "&:hover": {
            borderColor: "#f87171",
            backgroundColor: "rgba(248,113,113,0.1)",
          },
        }}
      >
        Logout
      </Button>
    </Box>
  </Box>
);


  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: "#fff",
          color: "#000",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(true)}
              sx={{ display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Typography fontWeight={600}>
              {location.pathname === "/dashboard"
                ? "Dashboard"
                : "Employees"}
            </Typography>
          </Box>

          <Button
            startIcon={<LogoutIcon />}
            color="inherit"
            onClick={handleLogout}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "1px solid #eee",
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          mt: 8,
          ml: { md: `${drawerWidth}px` },
          backgroundColor: "#f5f6fa",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
