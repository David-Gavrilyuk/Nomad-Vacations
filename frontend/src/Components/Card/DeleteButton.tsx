import api from "../../API/axios";
import { useState } from "react";
import IconButton from "@mui/joy/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material/";
import { store } from "../../Redux/Store";
import { setSnackNote } from "../../Redux/SnackBarReducer";
import { deleteVacationAction } from "../../Redux/VacationReducer";
import { Vacation } from "../../Models/Vacation";

function DeleteButton({ props }: { props: Vacation }): JSX.Element {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async (image: string | undefined, id: number) => {
    try {
      console.log(typeof image);
      await api.delete(`/vacations/vacation/delete/${image}/${id}`);
      store.dispatch(deleteVacationAction(id));
      store.dispatch(setSnackNote(true, "warning", "Vacation Deleted"));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="DeleteButton">
      <IconButton size="sm" variant="soft" color="neutral" sx={{ position: "absolute", zIndex: 1, left: "70px", top: 10 }} onClick={handleClickOpen}>
        <DeleteIcon /> Delete
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Are you sure you want to delete this vacation?"}</DialogTitle>
        <DialogActions>
          <Button onClick={() => props.vacation_id && handleDelete(props.image_name, props.vacation_id)} autoFocus color="warning">
            Delete
          </Button>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteButton;
