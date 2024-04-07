import "./NavBar.css";
import { Typography, Container, Toolbar, Box, AppBar } from "@mui/material/";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import NavBarButtons from "./NavBarButtons";
import MobileMenu from "./MobileMenu";
import UserMenu from "./UserMenu";

function NavBar({ currentUser }: { currentUser?: any }): JSX.Element {
  return (
    <div className="NavBar">
      <AppBar color="secondary" position="static" sx={{ marginBottom: "20px", backgroundColor: "#263238" }}>
        <Container maxWidth="xl">
          <Toolbar>
            <MobileMenu currentUser={currentUser} />

            {/* Logo */}
            <FlightTakeoffIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{ fontFamily: "monospace", fontWeight: 700, letterSpacing: ".3rem", display: { xs: "none", sm: "flex" } }}
            >
              Nomad-Vacations
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <NavBarButtons currentUser={currentUser} />
            </Box>

            <UserMenu currentUser={currentUser} />
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default NavBar;
