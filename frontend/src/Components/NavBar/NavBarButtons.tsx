import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Box, Button } from "@mui/material/";
import Role from "../../Models/Role";

function NavBarButtons({ currentUser }: { currentUser: any }): JSX.Element {
  return (
    <div className="NavBarButtons">
      <Box className="navButtons">
        {/* Navigation Buttons For Logged/Unlogged User | Role Admin/User */}
        {currentUser && (
          <Button disableElevation sx={{ borderRadius: 0, backgroundColor: "#263238" }}>
            <NavLink to="/">Home</NavLink>
          </Button>
        )}
        {currentUser?.role === Role.admin && (
          <>
            <Button disableElevation sx={{ borderRadius: 0, backgroundColor: "#263238" }}>
              <NavLink to="/addVacation">Add Vacation</NavLink>
            </Button>
            <Button disableElevation sx={{ borderRadius: 0, backgroundColor: "#263238" }}>
              <NavLink to="/vacationChart">Vacations Chart</NavLink>
            </Button>
          </>
        )}
        {!currentUser && (
          <Button disableElevation sx={{ borderRadius: 0, backgroundColor: "#263238" }}>
            <NavLink to="/register">Register</NavLink>
          </Button>
        )}
        {!currentUser && (
          <Button disableElevation sx={{ borderRadius: 0, backgroundColor: "#263238" }}>
            <NavLink to="/login">Login</NavLink>
          </Button>
        )}
      </Box>
    </div>
  );
}

export default NavBarButtons;
