import "./Header.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, store } from "../../../Redux/Store";
import { login } from "../../../Redux/UserReducer";
import NavBar from "../../NavBar/NavBar";

function Header(): JSX.Element {
  const currentUser = useSelector((state: RootState) => state.userState.user);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      store.dispatch(login(user));
    }
  }, []);

  return (
    <div className="Header">
      <NavBar currentUser={currentUser} />
    </div>
  );
}

export default Header;
