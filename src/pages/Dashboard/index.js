import { Alert, Box, Button, Grid, Stack, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import FormTechs from "../../components/FormTechs";

const Dashboard = ({ authenticated, setAuthenticated, setUser, user }) => {

  const [token, setToken] = useState(() => {
    const localToken = localStorage.getItem("token") || "";
    return JSON.parse(localToken);
  });

  const history = useHistory();

  const handleClick = () => {
    setAuthenticated(false);
    localStorage.clear();
    history.push("/");
  };

  useEffect(() => {
    if (token !== "") {
      axios
      .get("https://kenziehub.herokuapp.com/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          setAuthenticated(true);
          setUser(response.data);
        })
        .catch((e) => console.log(e));
    }
  });

  return authenticated ? (
    <>
      <Grid container direction="column" alignItems="flex-end" spacing={1}>
        <Grid item alignItems="flex-end" m={5}>
          <div>Bem-vindo, {user.name}</div>
          <Button variant="text" onClick={() => handleClick()}>
            SAIR
          </Button>
        </Grid>
      </Grid>
      <Box>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="secondary"
          gutterBottom
        >
          Tecnologias
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Cadastre aqui as tecnologias que você conhece
        </Typography>
        <FormTechs token={token} />
      </Box>
    </>
  ) : (
    <Stack sx={{ width: "75%" }} spacing={2} mt={25}>
      <Alert
        variant="filled"
        severity="warning"
        action={
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            onClick={() => history.push("/login")}
          >
            LOGIN
          </Button>
        }
      >
        Acesso não autorizado
      </Alert>
    </Stack>
  );
};
export default Dashboard;
