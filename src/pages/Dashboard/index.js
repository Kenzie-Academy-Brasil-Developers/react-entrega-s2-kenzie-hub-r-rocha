import { Alert, Box, Button, Grid, Stack, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CardTechs from "../../components/CardTechs";
import FormTechs from "../../components/FormTechs";

const Dashboard = ({ authenticated, setAuthenticated }) => {
  const [user, setUser] = useState([]);
  const [techs, setTechs] = useState([]);

  const [token] = useState(() => {
    const localToken = localStorage.getItem("token") || "";
    if (localToken !== "") {
      return JSON.parse(localToken);
    } else {
      return localToken;
    }
  });

  const history = useHistory();

  const handleClick = () => {
    setAuthenticated(false);
    localStorage.clear();
    history.push("/");
  };

  const autentica = () => {
    axios
      .get("https:kenziehub.herokuapp.com/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        setTechs(response.data.techs);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    autentica();
  });

  return authenticated ? (
    <>
      <Grid container direction="column" alignItems="flex-end" spacing={1}>
        <Grid item alignItems="flex-end" m={1}>
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
      </Box>
      <FormTechs token={token} />
      <CardTechs techs={techs} />
    </>
  ) : (
    <Stack sx={{ width: "75%" }} spacing={2} mt={25}>
      <Alert
        variant="filled"
        severity="warning"
      >
        Acesso não autorizado
      </Alert>
    </Stack>
  );
};
export default Dashboard;
