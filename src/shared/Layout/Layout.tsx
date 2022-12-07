import React, { FC, useState, Dispatch, SetStateAction } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
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
import { styledLayout } from "./style";

export interface ILayoutProps {
  title: string;
  isBackButton: boolean;
  setTitle: Dispatch<SetStateAction<string>>;
  setIsBackButton: Dispatch<SetStateAction<boolean>>;
}

const Layout: FC<ILayoutProps> = ({
  title,
  isBackButton,
  setIsBackButton,
  setTitle,
}) => {
  const [openUserSettings, setOpenUserSettings] = useState<null | HTMLElement>(
    null
  );
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setOpenUserSettings(event.currentTarget);
  };

  const handleCloseUserMenu = (): void => {
    setOpenUserSettings(null);
  };

  const moveBackOnDashboard = (where: string): void => {
    setIsBackButton(false);
    setTitle("Dashboard");
    navigate(where, { replace: true });
  };

  const firstLetterForIcon = (): string => {
    return !loading && user ? user.email[0].toUpperCase() : "-";
  };

  const isUserName = (): string => {
    return !loading && user ? user.email : "...";
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
          <Typography variant="h6" noWrap sx={styledLayout.title}>
            {title}
          </Typography>
          <Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={firstLetterForIcon()} src="-" />
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
                sx: styledLayout.paper,
              }}
            >
              <MenuItem sx={{ cursor: "text" }}>
                <Avatar /> {isUserName()}
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
};
export default Layout;
