import "./Register.css";
import api from "../../../API/axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import { store } from "../../../Redux/Store";
import { setSnackNote } from "../../../Redux/SnackBarReducer";
import DisplayErrors from "../../../Utils/DisplayErrors";
import FormErrors from "../../../Utils/FormErrors";
import { User } from "../../../Models/User";

function Register(): JSX.Element {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<User>();

  const [error, setError] = useState(null);
  const errors = FormErrors({ error });

  const send = async (userData: User) => {
    try {
      await api.post("/users/register", userData);
      store.dispatch(setSnackNote(true, "success", "Registered succesfuly!"));
      navigate("/login");
    } catch (error: any) {
      setError(error.response.data);
    }
  };

  return (
    <div className="Register Box">
      <h1>Register</h1>

      <form onSubmit={handleSubmit(send)}>
        <TextField label="First Name" size="small" variant="standard" {...register("first_name")} sx={{ marginBottom: "10px" }} />
        <DisplayErrors error={errors.first_name} />

        <TextField label="Last Name" size="small" variant="standard" {...register("last_name")} sx={{ marginBottom: "10px" }} />
        <DisplayErrors error={errors.last_name} />

        <TextField label="Email" size="small" variant="standard" {...register("email")} sx={{ marginBottom: "10px" }} />
        <DisplayErrors error={errors.email} />
        <DisplayErrors error={errors.message} />

        <TextField label="Password" type="password" size="small" variant="standard" {...register("password")} sx={{ marginBottom: "10px" }} />
        <DisplayErrors error={errors.password} />

        <Button color="primary" variant="contained" aria-label="outlined primary button group" type="submit" sx={{ marginTop: "20px" }}>
          Register
        </Button>
        <Box sx={{ marginTop: "20px", marginBottom: "10px" }}>already a member?</Box>
        <NavLink to="/login">Login</NavLink>
      </form>
    </div>
  );
}

export default Register;
