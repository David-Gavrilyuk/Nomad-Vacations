import "./Login.css";
import api from "../../../API/axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import { store } from "../../../Redux/Store";
import { setSnackNote } from "../../../Redux/SnackBarReducer";
import { login } from "../../../Redux/UserReducer";
import FormErrors from "../../../Utils/FormErrors";
import DisplayErrors from "../../../Utils/DisplayErrors";

function Login(): JSX.Element {
  interface Login {
    email: string;
    password: string;
  }

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<Login>();

  const [error, setError] = useState(null);
  const errors = FormErrors({ error });

  const send = async (loginData: Login) => {
    try {
      const response = await api.post("/users/login", loginData);

      store.dispatch(login(response.data.user, response.data.token));
      store.dispatch(setSnackNote(true, "success", "Login succesful!"));
      navigate("/");
    } catch (err: any) {
      setError(err.response.data);
    }
  };

  return (
    <div className="Login">
      <div className="Box">
        <h1>Login</h1>

        <form onSubmit={handleSubmit(send)}>
          <TextField label="Email" size="small" variant="standard" {...register("email")} sx={{ marginBottom: "10px" }} />
          <DisplayErrors error={errors.email} />

          <TextField label="Password" type="password" size="small" variant="standard" {...register("password")} sx={{ marginBottom: "10px" }} />
          <DisplayErrors error={errors.password} />
          <DisplayErrors error={errors.message} />

          <Button color="primary" variant="contained" aria-label="outlined primary button group" type="submit" sx={{ marginTop: "20px" }}>
            Login
          </Button>

          <Box sx={{ marginTop: "20px", marginBottom: "10px" }}>Don't have an account?</Box>
          <NavLink to="/register">Register now</NavLink>
        </form>
      </div>
      <br />
      <div className="Box">
        ---Login Details---!
        <br />
        <br />
        [User] ~ Email: user@user.com ~ Password: user
        <br />
        <br />
        [Admin] ~ Email: admin@admin.com ~ Password: admin
      </div>
    </div>
  );
}

export default Login;
