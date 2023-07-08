import "./AddVacation.css";
import api from "../../../API/axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Input, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import { store } from "../../../Redux/Store";
import { getVacationsAction } from "../../../Redux/VacationReducer";
import { setSnackNote } from "../../../Redux/SnackBarReducer";
import FormErrors from "../../../Utils/FormErrors";
import DisplayErrors from "../../../Utils/DisplayErrors";
import { Vacation } from "../../../Models/Vacation";
import defaultImage from "../../../assets/images/default.png";

function AddVacation(): JSX.Element {
  const { control, register, handleSubmit } = useForm<Vacation>();
  const navigate = useNavigate();

  const [file, setFile] = useState();
  const [image, setImage] = useState(defaultImage);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = useState(null);
  const errors = FormErrors({ error });

  const handleFile = (e: any) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const send = async (vacationData: Vacation) => {
    try {
      setLoading(true);

      vacationData.image_file = file;
      await api.post("/vacations/addVacation", vacationData);

      store.dispatch(setSnackNote(true, "success", "Vacation Added"));

      const allVacation = await api.get("/vacations/allVacations");
      const sortedVacations = allVacation.data.sort((a: any, b: any) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());

      store.dispatch(getVacationsAction(sortedVacations));

      navigate("/");
    } catch (error: any) {
      if (error.response && error.response.data) {
        setError(error.response.data);
        console.log(error.response.data);
      } else {
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="AddVacation Box">
      <h1>Add Vacation</h1>

      <form onSubmit={handleSubmit(send)}>
        {/* Destination */}
        <TextField label="Destination" size="small" variant="outlined" {...register("destination")} />
        <DisplayErrors error={errors.destination} />

        {/* Description */}
        <TextField
          label="Description"
          size="small"
          variant="outlined"
          multiline
          minRows={3}
          maxRows={3}
          sx={{ maxWidth: 207, marginTop: "20px" }}
          {...register("description")}
        />
        <DisplayErrors error={errors.description} />

        {/* Start Date */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controller
            name="start_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Start Date"
                format="dd/MM/yyyy"
                value={new Date(field.value)}
                onChange={(date) => field.onChange(date)}
                slotProps={{ textField: { size: "small", error: false } }}
                sx={{ width: "69%", marginTop: "20px" }}
              />
            )}
          />
        </LocalizationProvider>
        <DisplayErrors error={errors.start_date} />

        {/* End Date */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controller
            name="end_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="End Date"
                format="dd/MM/yyyy"
                value={new Date(field.value)}
                onChange={(date) => field.onChange(date)}
                slotProps={{ textField: { size: "small", error: false } }}
                sx={{ width: "69%", marginTop: "20px" }}
              />
            )}
          />
        </LocalizationProvider>
        <DisplayErrors error={errors.end_date} />

        {/* Price */}
        <TextField type="number" label="Price" size="small" variant="outlined" {...register("price")} sx={{ marginTop: "20px" }} />
        <DisplayErrors error={errors.price} />

        {/* Image */}
        <Box className="coverImage">Cover Image</Box>
        <figcaption>Select Image</figcaption>
        <label htmlFor="fileInput">
          <img className="selectImage" src={image} alt="Select File" />
        </label>
        <Input id="fileInput" type="file" sx={{ display: "none" }} onChange={handleFile} />
        <DisplayErrors error={errors.image_file} />

        {/* Buttons */}
        <LoadingButton type="submit" loading={loading} endIcon={<SendIcon />} loadingPosition="end" variant="contained" sx={{ marginTop: "20px", marginBottom: "20px" }}>
          <span>ADD VACATION</span>
        </LoadingButton>
        <br />
        <Button color="inherit" variant="contained" onClick={() => navigate("/")}>
          Cancel
        </Button>
      </form>
    </div>
  );
}

export default AddVacation;
