import * as yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Typography } from "@material-ui/core";

const FormRegister = () => {
  const history = useHistory();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Email inválido")
      .required("E-mail é obrigatório"),
    password: yup
      .string()
      .min(6, "Mínimo de 6 dígitos")
      //   .matches(
      //     /^((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      //     "Senha deve conter ao menos uma letra maiúscula, uma minúscula, um número e um caracter especial!"
      //   )
      .required("Senha é obrigatória"),
    name: yup.string().required("Nome é obrigatório"),
    bio: yup.string().required("Biografia é obrigatório"),
    contact: yup.string().required("Contato é obrigatório"),
    course_module: yup.string().required("Módulo do curso é obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleForm = (data) => {
    console.log(data);
    axios
      .post("https://kenziehub.herokuapp.com/users", data)
      .then((response) => {
        localStorage.clear();
        localStorage.setItem("token", JSON.stringify(response.data.token));
        history.push("/login");
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
          mt: 5,
        }}
        component="form"
      >
        <Typography variant="h3" color="secondary">
          Cadastro
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
          label="Senha"
          margin="normal"
          variant="outlined"
          size="small"
          color="primary"
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          fullWidth
          label="Nome"
          margin="normal"
          variant="outlined"
          size="small"
          color="primary"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          fullWidth
          label="Bio"
          margin="normal"
          variant="outlined"
          size="small"
          color="primary"
          {...register("bio")}
          error={!!errors.bio}
          helperText={errors.bio?.message}
        />
        <TextField
          fullWidth
          label="Contato"
          margin="normal"
          variant="outlined"
          size="small"
          color="primary"
          {...register("contact")}
          error={!!errors.contact}
          helperText={errors.contact?.message}
        />
        <TextField
          fullWidth
          label="Módulo"
          margin="normal"
          variant="outlined"
          size="small"
          color="primary"
          {...register("course_module")}
          error={!!errors.course_module}
          helperText={errors.course_module?.message}
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
          onClick={() => history.push("/")}
        >
          Login
        </Button>
      </Box>
    </>
  );
};
export default FormRegister;
