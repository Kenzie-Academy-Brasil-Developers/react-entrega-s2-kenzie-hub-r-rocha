import * as yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Typography } from "@material-ui/core";

const FormLogin = ({ setAuthenticated }) => {
  const history = useHistory();

  const schema = yup.object().shape({
    email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
    password: yup
      .string()
      .min(6, "Mínimo de 6 caracteres")
      .required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleForm = (data) => {
    axios
      .post("https://kenziehub.herokuapp.com/sessions", data)
      .then((response) => {
        localStorage.clear();
        localStorage.setItem("token", JSON.stringify(response.data.token));
        setAuthenticated(true);
        history.push("/dashboard");
      })
      .catch((error) => {
        // Error 😨
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          alert(error.response.data.message);
        } else {
          // Something happened in setting up the request and triggered an Error
          console.log("Error", error.message);
        }
      });
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: 300,
          width: 300,
          mt: 25,
        }}
        component="form"
      >
        <Typography variant="h3" color="secondary">
          Login
        </Typography>

        <TextField
          fullWidth
          label="E-mail"
          margin="normal"
          variant="outlined"
          size="small"
          color="primary"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          fullWidth
          label="Password"
          margin="normal"
          variant="outlined"
          size="small"
          color="primary"
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          sx={{ my: 1 }}
          onClick={handleSubmit(handleForm)}
        >
          Enviar
        </Button>
        <Button
          type="submit"
          variant="text"
          color="secondary"
          size="large"
          fullWidth
          sx={{ my: 1 }}
          onClick={() => history.push("/register")}
        >
          Sign Up
        </Button>
      </Box>
    </>
  );
};
export default FormLogin;
