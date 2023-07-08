import "./Cards.css";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { Card, CardContent, CardOverflow } from "@mui/joy/";
import { AspectRatio, Typography, Box } from "@mui/joy/";
import { CardActions, Button } from "@mui/material/";
import EventIcon from "@mui/icons-material/Event";
import { RootState } from "../../Redux/Store";
import { Vacation } from "../../Models/Vacation";
import Role from "../../Models/Role";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import LikeButton from "./LikeButton";

function Cards(props: Vacation): JSX.Element {
  const currentUser = useSelector((state: RootState) => state.userState.user);

  const vacation: Vacation = {
    vacation_id: props.vacation_id,
    destination: props.destination,
    description: props.description,
    start_date: dayjs(props.start_date).format("DD/MM/YYYY"),
    end_date: dayjs(props.end_date).format("DD/MM/YYYY"),
    price: props.price,
    image_name: `https://project-vacations.com/api/vacations/vacation/image/${props.image_name}`,
  };

  return (
    <div className="Cards">
      <Card variant="outlined" className="CardOutlined">
        <CardOverflow>
          {/* Card Image */}
          <AspectRatio>
            <img src={vacation.image_name} alt="" />
          </AspectRatio>

          {/* Buttons */}
          <CardActions>
            {currentUser?.role !== Role.admin ? (
              <LikeButton vacation_id={vacation.vacation_id} user_id={currentUser?.user_id ?? undefined} />
            ) : (
              <Box>
                <EditButton props={props} /> <DeleteButton props={props} />{" "}
              </Box>
            )}
          </CardActions>
        </CardOverflow>

        {/* Card Body */}
        <CardContent>
          <Typography className="Destination" level="h1" fontSize="lg" sx={{ color: "whitesmoke" }}>
            {vacation.destination}
          </Typography>

          <Box className="Date">
            <EventIcon fontSize="small" className="DateIcon" />
            {vacation.start_date} - {vacation.end_date}
          </Box>

          <Typography className="Description scrollBar">{vacation.description}</Typography>
        </CardContent>

        <Button variant="contained" className="PriceButton">
          ${vacation.price}
        </Button>
      </Card>
    </div>
  );
}

export default Cards;
