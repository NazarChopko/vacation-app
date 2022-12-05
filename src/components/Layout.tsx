import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import { useAuth } from "../hooks/useAuth";

function ResponsiveAppBar({ children }: any) {
  const [openUserSettings, setOpenUserSettings] = useState(null);
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  //   useEffect(() => {
  //     if (loading) return;
  //     if (user && !user.remember) {
  //       navigate("/login", { replace: true });
  //     } else if (user && user.remember) {
  //       navigate("/user", { replace: true });
  //     }

  //     return () => localStorage.removeItem("user");
  //   }, []);

  const handleOpenUserMenu = (event: any) => {
    setOpenUserSettings(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setOpenUserSettings(null);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar disableGutters sx={{ p: "0px 10px" }}>
          <Typography
            variant="h6"
            noWrap
            sx={{
              width: "100%",
              mr: "auto",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            Dashboard
          </Typography>
          <Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  //   alt={loading ? "?" : user.email[0].toUpperCase()}
                  src="-"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={openUserSettings}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(openUserSettings)}
              onClose={handleCloseUserMenu}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
            >
              <MenuItem sx={{ cursor: "text" }}>
                <Avatar /> {loading ? "..." : user.email}
              </MenuItem>

              <MenuItem onClick={logout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
}
export default ResponsiveAppBar;
