import * as yup from "yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField } from "@material-ui/core";

const FormTechs = ({ token }) => {

  const schema = yup.object().shape({
    title: yup.string().required("Título é obrigatório"),
    status: yup.string().required("Status é obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleForm = (data) => {
    axios
      .post("https://kenziehub.herokuapp.com/users/techs", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        alert("Tecnologia cadastrada com sucesso");
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      component="form"
      onSubmit={handleSubmit(handleForm)}
    >
      <TextField
        fullWidth
        label="Titulo"
        margin="normal"
        variant="outlined"
        size="small"
        color="primary"
        {...register("title")}
        error={!!errors.title}
        helperText={errors.title?.message}
      />
      <TextField
        fullWidth
        label="Status"
        margin="normal"
        variant="outlined"
        size="small"
        color="primary"
        {...register("status")}
        error={!!errors.status}
        helperText={errors.status?.message}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        sx={{ my: 1 }}
      >
        Enviar
      </Button>
    </Box>
  );
};
export default FormTechs;
