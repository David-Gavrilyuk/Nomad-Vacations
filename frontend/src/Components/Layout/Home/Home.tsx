import "./Home.css";
import api from "../../../API/axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, store } from "../../../Redux/Store";
import { allFollowers } from "../../../Redux/FollowersReducer";
import { getVacationsAction } from "../../../Redux/VacationReducer";
import { Vacation } from "../../../Models/Vacation";
import VacationList from "../../VacationList/VacationList";

function Main(): JSX.Element {
  const allVacations: Vacation[] = useSelector((state: RootState) => state.VacationsState.allVacations);

  const getAllVacations = async () => {
    try {
      const allVacation = await api.get("/vacations/allVacations");
      const sortedVacations = allVacation.data.sort((a: any, b: any) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
      store.dispatch(getVacationsAction(sortedVacations));
    } catch (error: any) {
      console.log(error);
    }
  };

  const getAllLikes = async () => {
    try {
      const allLikes = await api.get("/likes/allLikes");
      store.dispatch(allFollowers(allLikes.data));
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllVacations();
  }, []);

  useEffect(() => {
    if (allVacations.length > 0) {
      getAllLikes();
    }
  }, [allVacations]);

  return (
    <div className="Main">
      <VacationList />
    </div>
  );
}
export default Main;
