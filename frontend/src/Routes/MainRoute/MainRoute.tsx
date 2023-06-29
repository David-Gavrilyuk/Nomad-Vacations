import "./MainRoute.css";
import { Route, Routes } from "react-router-dom";
import Home from "../../Components/Layout/Home/Home";
import Login from "../../Components/Pages/Login/Login";
import Register from "../../Components/Pages/Register/Register";
import AddVacation from "../../Components/Pages/AddVacation/AddVacation";
import EditVacation from "../../Components/Pages/EditVacation/EditVacation";
import VacationChart from "../../Components/Pages/VacationChart/VacationChart";
import Page404 from "../../Components/Pages/Page404/Page404";
import RequireAuth from "../../Helpers/RequireAuth";

function MainRoute(): JSX.Element {
  return (
    <div className="MainRoute">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<RequireAuth />}>
          <Route path="/addVacation" element={<AddVacation />} />
          <Route path="/editVacation/:image/:id" element={<EditVacation />} />
          <Route path="/vacationChart" element={<VacationChart />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </div>
  );
}

export default MainRoute;
