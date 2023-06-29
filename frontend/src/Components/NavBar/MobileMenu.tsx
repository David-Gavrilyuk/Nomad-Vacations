import React from "react";
import { IconButton, MenuItem, Box, Menu } from "@mui/material/";
import MenuIcon from "@mui/icons-material/Menu";
import NavBarButtons from "./NavBarButtons";

function MobileMenu({ currentUser }: { currentUser: any }): JSX.Element {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <div className="MobileMenu">
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
          <MenuIcon />
        </IconButton>

        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuItem onClick={handleCloseNavMenu}>
            <div className="column-container">
              <NavBarButtons currentUser={currentUser} />
            </div>
          </MenuItem>
        </Menu>
      </Box>
    </div>
  );
}

export default MobileMenu;
