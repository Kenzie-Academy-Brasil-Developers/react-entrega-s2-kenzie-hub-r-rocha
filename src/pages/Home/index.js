import { Alert, AlertTitle, Button, Stack } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState({});

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [token, setToken] = useState(() => {
    const localToken = localStorage.getItem("@KenzieHub:token") || "[]";
    return JSON.parse(localToken);
  });

  const history = useHistory();

  const handleClick = () => {
    setIsAuthenticated(false);
    localStorage.clear();
    history.push("/");
  };

  useEffect(() => {
    axios
      .get("https://kenziehub.herokuapp.com/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        setIsAuthenticated(true);
      })
      .catch((e) => console.log(e));
  });

  return isAuthenticated ? (
    <>
      <div>Bem-vindo, {user.name}</div>
      <Button variant="outlined" onClick={() => handleClick()}>
        SAIR
      </Button>
    </>
  ) : (
    <Stack sx={{ width: "75%" }} spacing={2} mt={25}>
      <Alert
        variant="filled"
        severity="warning"
        action={
          <Button variant="outlined" color="inherit" size="small" onClick={() => history.push("/login")}>
            LOGIN
          </Button>
        }
      >
        Acesso não autorizado
      </Alert>
    </Stack>
  );
};
export default Home;
