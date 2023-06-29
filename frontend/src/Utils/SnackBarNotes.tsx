import React from "react";
import { useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";
import { setSnackNote } from "../Redux/SnackBarReducer";
import { RootState, store } from "../Redux/Store";

const CustomizedSnackbars = () => {
  const snackbarOpen = useSelector((state: RootState) => state.SnackBarState.snackbarOpen);
  const snackbarType = useSelector((state: RootState) => state.SnackBarState.snackbarType) as AlertColor;
  const snackbarMessage = useSelector((state: RootState) => state.SnackBarState.snackbarMessage);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    store.dispatch(setSnackNote(false, snackbarType, snackbarMessage));
  };

  return (
    <div>
      <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleClose}>
        <Alert elevation={6} variant="filled" severity={snackbarType} onClose={handleClose}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomizedSnackbars;
