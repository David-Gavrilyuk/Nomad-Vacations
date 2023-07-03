import "./EditVacation.css";
import api from "../../../API/axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Input, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { RootState, store } from "../../../Redux/Store";
import { editVacationAction } from "../../../Redux/VacationReducer";
import { setSnackNote } from "../../../Redux/SnackBarReducer";
import FormErrors from "../../../Utils/FormErrors";
import DisplayErrors from "../../../Utils/DisplayErrors";
import { Vacation } from "../../../Models/Vacation";

function EditVacation(): JSX.Element {
  const { control, register, handleSubmit } = useForm<Vacation>();
  const params = useParams();
  const navigate = useNavigate();

  const allVacations: Vacation[] = useSelector((state: RootState) => state.VacationsState.allVacations);

  const [file, setFile] = useState();
  const [image, setImage] = useState(`http://206.81.21.198:4000/vacations/vacation/image/${params.image}`);

  const [error, setError] = useState(null);
  const errors = FormErrors({ error });

  const vacation = allVacations.find((v) => v.vacation_id === Number(params.id));

  const handleFile = (e: any) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const send = async (vacationData: Vacation) => {
    try {
      const id = params?.id ? +params.id : 0;
      vacationData.image_file = file ? file : params.image;

      await api.patch(`/vacations/editVacation/${id}`, vacationData);

      store.dispatch(editVacationAction(vacationData));
      store.dispatch(setSnackNote(true, "success", "Vacation updated"));
      navigate("/");
    } catch (error: any) {
      if (error.response && error.response.data) {
        setError(error.response.data);
        console.log(error.response.data);
      } else {
        navigate("/");
      }
    }
  };

  return (
    <div className="EditVacation Box">
      <h1>Edit Vacation</h1>

      <form onSubmit={handleSubmit(send)}>
        {/* Destination */}
        <TextField label="Destination" color="primary" size="small" defaultValue={vacation?.destination} {...register("destination")} />
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
          defaultValue={vacation?.description}
          {...register("description")}
        />
        <DisplayErrors error={errors.description} />

        {/* Start Date */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Controller
            name="start_date"
            control={control}
            defaultValue={vacation?.start_date || ""}
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
            defaultValue={vacation?.end_date || ""}
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
        <TextField label="Price" size="small" variant="outlined" defaultValue={vacation?.price} {...register("price")} sx={{ marginTop: "20px" }} />
        <DisplayErrors error={errors.price} />

        {/* Image */}
        <Box className="coverImage">Cover Image</Box>
        <figcaption>Change Image</figcaption>
        <label htmlFor="fileInput">
          <img className="selectImage" src={image} alt="Select File" />
        </label>
        <Input id="fileInput" type="file" sx={{ display: "none" }} onChange={handleFile} />
        <DisplayErrors error={errors.image_file} />

        {/* Buttons */}
        <Button color="primary" variant="contained" type="submit" sx={{ marginTop: "20px" }}>
          Edit Vacation
        </Button>
        <br />
        <Button color="inherit" variant="contained" onClick={() => navigate("/")} sx={{ marginTop: "20px" }}>
          Cancel
        </Button>
      </form>
    </div>
  );
}

export default EditVacation;
