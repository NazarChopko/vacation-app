import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTypedSelector } from "../redux/hooks/useTypedSelector";
import { useCustomDispatch } from "../redux/hooks/customDispatch";
import { handleBackButton, editTitle } from "../redux/slices/controlSlice";
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function ResponsiveAppBar() {
  const [openUserSettings, setOpenUserSettings] = useState(null);
  const { user, logout, loading } = useAuth();
  const { isBackButton, title } = useTypedSelector(
    (state) => state.controlSlice
  );
  const dispatch = useCustomDispatch();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: any) => {
    setOpenUserSettings(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setOpenUserSettings(null);
  };

  const moveBackOnDashboard = (where: string) => {
    dispatch(handleBackButton(false));
    dispatch(editTitle("Dashboard"));
    navigate(where, { replace: true });
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar disableGutters sx={{ p: "0px 10px" }}>
          {isBackButton ? (
            <Box>
              <IconButton
                onClick={() => moveBackOnDashboard("/user")}
                sx={{ p: 0 }}
              >
                <ArrowBackIcon sx={{ color: "white" }} />
              </IconButton>
            </Box>
          ) : null}
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
            {title}
          </Typography>
          <Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={!loading && user ? user.email[0].toUpperCase() : "-"}
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
                <Avatar /> {!loading && user ? user.email : "..."}
              </MenuItem>

              <MenuItem
                onClick={() => {
                  moveBackOnDashboard("/");
                  logout();
                }}
              >
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}
export default ResponsiveAppBar;
