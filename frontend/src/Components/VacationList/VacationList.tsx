import "./VacationList.css";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Button, Grid, Pagination, Radio, Box } from "@mui/material";
import { FormControlLabel, RadioGroup, FormControl } from "@mui/material";
import { RootState } from "../../Redux/Store";
import { Vacation } from "../../Models/Vacation";
import Follower from "../../Models/Follower";
import Role from "../../Models/Role";
import Cards from "../Card/Cards";

function VacationList(): JSX.Element {
  const currentUser = useSelector((state: RootState) => state.userState.user);
  const allVacations: Vacation[] = useSelector((state: RootState) => state.VacationsState.allVacations);
  const allLikes: Follower[] = useSelector((state: RootState) => state.FollowersState.followers);

  // Filtered vacations
  const [likedVacations, setLikedVacations] = useState<Vacation[]>([]);
  const [upcomingVacations, setUpcomingVacations] = useState<Vacation[]>([]);
  const [ongoingVacations, setOngoingVacations] = useState<Vacation[]>([]);

  // Selected filter button visability and value
  const [selectedFilter, setSelectedFilter] = useState(() => {
    const storedFilter = sessionStorage.getItem("currentFilter");
    return storedFilter || "All";
  });
  const [showFilter, setShowFilter] = useState(false);

  const [currentPage, setCurrentPage] = useState(() => {
    const storedPage = Number(sessionStorage.getItem("currentPage"));
    return storedPage || 1;
  });

  const filterVacations = useCallback(() => {
    const today = new Date();
    setLikedVacations(
      allVacations.filter((vacation) => allLikes.some((like) => like.user_id === currentUser?.user_id && like.vacation_id === vacation.vacation_id))
    );
    setUpcomingVacations(allVacations.filter((vacation) => new Date(vacation.start_date) > today));
    setOngoingVacations(
      allVacations.filter((vacation) => {
        const startDate = new Date(vacation.start_date);
        const endDate = new Date(vacation.end_date);
        return startDate <= today && endDate >= today;
      })
    );
  }, [allVacations, allLikes, currentUser]);

  // Filter and Pagination button click handle
  const handleButtonClick = () => setShowFilter(!showFilter);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFilter(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  // Pagination pages index
  const itemsPerPage = 12;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Selected filter value options
  const filterOptions: any = {
    All: allVacations,
    Liked: likedVacations,
    Upcoming: upcomingVacations,
    Ongoing: ongoingVacations,
  };

  // Current items and their count
  const currentItems = filterOptions[selectedFilter]?.slice(indexOfFirstItem, indexOfLastItem) || [];
  const totalCount = filterOptions[selectedFilter]?.length || currentItems.length;

  const pagination = (
    <Pagination
      variant="outlined"
      shape="rounded"
      color="primary"
      count={Math.ceil(totalCount / itemsPerPage)}
      page={currentPage}
      onChange={(event, page) => handlePageChange(page)}
    />
  );

  useEffect(() => {
    sessionStorage.setItem("currentPage", String(currentPage));
    sessionStorage.setItem("currentFilter", selectedFilter);
  }, [currentPage, selectedFilter]);

  useEffect(() => {
    filterVacations();
  }, [filterVacations]);

  return (
    <div className="VacationList">
      <div className="filterList">
        <Button onClick={handleButtonClick}>
          <FilterListIcon /> {` ${selectedFilter} Vacations`}
        </Button>
        {showFilter && (
          <FormControl className="filterSelect" component="fieldset">
            <RadioGroup value={selectedFilter} name="row-radio-buttons-group" onChange={handleFilterChange}>
              <FormControlLabel value="All" control={<Radio size="small" />} label="All Vacations" />
              {currentUser?.role !== Role.admin && <FormControlLabel value="Liked" control={<Radio size="small" />} label="Liked Vacations" />}
              <FormControlLabel value="Upcoming" control={<Radio size="small" />} label="Upcoming Vacations" />
              <FormControlLabel value="Ongoing" control={<Radio size="small" />} label="Ongoing Vacations" />
            </RadioGroup>
          </FormControl>
        )}
      </div>
      <div className="pagination-container">{pagination}</div>
      <Grid container direction="row" justifyContent="space-evenly">
        {currentItems.length < 1 ? (
          <Box className="Box" sx={{ marginTop: "20px" }}>
            There Are No {selectedFilter} Vacations Available
          </Box>
        ) : (
          currentItems.map((vacation: any) => <Cards key={vacation.vacation_id} {...vacation} />)
        )}
      </Grid>
      <div className="pagination-container">{pagination}</div>
    </div>
  );
}

export default VacationList;
