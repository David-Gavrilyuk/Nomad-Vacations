import "./VacationChart.css";
import api from "../../../API/axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { RootState, store } from "../../../Redux/Store";
import { getVacationsAction } from "../../../Redux/VacationReducer";
import { allFollowers } from "../../../Redux/FollowersReducer";
import DownloadCSV from "./DownlodCSV";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function VacationChart(): JSX.Element {
  const allVacations = useSelector((state: RootState) => state.VacationsState.allVacations);
  const followers = useSelector((state: RootState) => state.FollowersState.followers);

  const data = {
    labels: allVacations.map((vacation) => vacation.destination),
    datasets: [
      {
        label: "Vacation likes",
        data: allVacations.map((vacation) => {
          const count = followers.filter((follower) => follower.vacation_id === vacation.vacation_id).length;
          return count;
        }),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)"],
        borderWidth: 1,
      },
    ],
  };

  const config = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const getAllVacations = async () => {
    try {
      if (allVacations.length < 1) {
        const allVacation = await api.get("/vacations/allVacations");
        store.dispatch(getVacationsAction(allVacation.data));
      }
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
    getAllLikes();
  }, []);

  return (
    <div className="VacationChart">
      <div className="chart">
        <Bar data={data} options={config} />
      </div>
      <br />
      <DownloadCSV labels={data.labels} datasets={data.datasets} />
    </div>
  );
}

export default VacationChart;
