import { Button, Box } from "@material-ui/core";
import working from "../../images/working-with-laptop.png";
import { useHistory } from "react-router-dom";

const StartPage = () => {
  const history = useHistory();

  return (
    <>
      <Box component="div" sx={{ width: "auto" }} mt={7}>
        <img src={working} alt="Authentication" />
      </Box>
      <Box sx={{ width: "100%" }}>
        <Button variant="contained" onClick={() => history.push("/login")}>
          LOGIN
        </Button>
      </Box>
      <Box mt={3}>
        <Button variant="text" onClick={() => history.push("/register")}>
          CADASTRE-SE
        </Button>
      </Box>
    </>
  );
};

export default StartPage;
