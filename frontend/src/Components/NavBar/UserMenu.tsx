import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Avatar, Tooltip, Box } from "@mui/material/";
import { Menu, Typography, MenuItem } from "@mui/material/";
import { store } from "../../Redux/Store";
import { logout } from "../../Redux/UserReducer";
import { setSnackNote } from "../../Redux/SnackBarReducer";

function UserMenu({ currentUser }: { currentUser: any }): JSX.Element {
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    store.dispatch(logout());
    store.dispatch(setSnackNote(true, "info", "Logged out"));
    navigate("/login");
  };

  return (
    <div className="UserMenu">
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/* User Full Name */}
        <Typography sx={{ marginRight: "1rem" }}>{currentUser ? `Welcome ${currentUser.first_name} ${currentUser.last_name} ` : ""}</Typography>

        {/* User Menu Icon */}
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar color="primary" alt={currentUser ? `${currentUser.first_name}` : ""} src="/static/images/avatar/2.jpg" sx={{ bgcolor: "#80deea" }} />
          </IconButton>
        </Tooltip>

        {/* User Menu */}
        {currentUser && (
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography onClick={handleLogout} textAlign="center">
                Logout
              </Typography>
            </MenuItem>
          </Menu>
        )}
      </Box>
    </div>
  );
}

export default UserMenu;
