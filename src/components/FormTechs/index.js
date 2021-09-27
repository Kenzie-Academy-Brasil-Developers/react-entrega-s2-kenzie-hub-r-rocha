import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField } from "@material-ui/core";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  /** Função utilizada no Select
   * const [status, setStatus] = useState("");
   *
   * const handleChange = (event) => {
   *    console.log(event.currentTarget);
   *    setStatus(event.currentTarget);
   * };
   **/

  const handleForm = (data) => {
    console.log(data);
    axios
      .post("https://kenziehub.herokuapp.com/users/tech", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Entrei aqui e não fiz nada");
        console.log(response.data);
        /** toast.success("Tecnologia cadastrada com sucesso", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => history.push("/home"), 1500); **/
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
          label="Satus"
          margin="normal"
          variant="outlined"
          size="small"
          color="primary"
          {...register("status")}
          error={!!errors.status}
          helperText={errors.status?.message}
        />

        {/** Não consegui implementar o Select */}
        {/* <FormControl fullWidth>
          <InputLabel id="demo-simple-select-error-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-error-label"
            id="demo-simple-select-error"
            value={status}
            label="Status"
            onChange={handleChange}
            {...register("status")}
            error={!!errors.status}
            helperText={errors.status?.message}
          >
            <MenuItem value="">
              <em>Nenhum</em>
            </MenuItem>
            <MenuItem value={10}>Iniciante</MenuItem>
            <MenuItem value={20}>Intermediário</MenuItem>
            <MenuItem value={30}>Avançado</MenuItem>
          </Select>
          <FormHelperText error>{errors.status?.message}</FormHelperText>
        </FormControl> */}

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
      </Box>
    </>
  );
};
export default FormTechs;
