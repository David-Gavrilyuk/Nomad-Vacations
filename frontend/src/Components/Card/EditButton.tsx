import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/joy/IconButton";
import { Vacation } from "../../Models/Vacation";

function EditButton(vacations: { props: Vacation }): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="EditButton">
      <IconButton
        size="sm"
        variant="soft"
        color="neutral"
        sx={{ position: "absolute", zIndex: 1, left: "10px", top: 10 }}
        onClick={() => navigate(`/editVacation/${vacations.props.image_name}/${vacations.props.vacation_id}`)}
      >
        <EditIcon /> Edit
      </IconButton>
    </div>
  );
}

export default EditButton;
