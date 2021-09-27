import * as yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormTechs = ({ token, user }) => {
  const schema = yup.object().shape({
    title: yup.string().required("Título é obrigatório"),
    status: yup.string().required("Status é obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const history = useHistory();

  const handleForm = (data) => {
    console.log(user);
    axios
      .post("https://kenziehub.herokuapp.com/users/techs", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(JSON.stringify(response.data));
        toast.success("Tecnologia cadastrada com sucesso", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => history.push("/dashboard"), 1500);
      })
      .catch((error) => {
        // Error 😨
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          // Something happened in setting up the request and triggered an Error
          console.log("Error", error.message);
        }
      });
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
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
        <FormControl fullWidth>
          <InputLabel id="select-label">Status</InputLabel>
          <Select labelId="select-label" id="status" {...register("status")}>
            <MenuItem value={''}>
              <em>Nenhum</em>
            </MenuItem>
            <MenuItem value={"Iniciante"}>
              Iniciante
            </MenuItem>
            <MenuItem value={"Intermediário"}>
              Intermediário
            </MenuItem>
            <MenuItem value={"Avançado"}>
              Avançado
            </MenuItem>
          </Select>
          <FormHelperText id="my-helper-text" error>
            {errors.status?.message}
          </FormHelperText>
        </FormControl>

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
    </>
  );
};
export default FormTechs;
