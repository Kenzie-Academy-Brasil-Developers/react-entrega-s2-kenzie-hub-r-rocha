import "./style.css";
import { Button, Box } from "@material-ui/core";
import working from "../../images/working-with-laptop.png";

const StartPage = ({ user, history }) => {
  console.log(user);
  console.log(history);
  return (
    /** <Grid container spacing={2} mt={10}>
      <Grid item xs={6} sm={3}>
        <img src={working} alt="Authentication" />
      </Grid>
      <Grid item xs={6}>
        <Button variant="contained">
          LOGIN
        </Button>
        <Button variant="contained">
          CADASTRE-SE
        </Button>
      </Grid>
    </Grid> */
    <>
      <Box component="div" sx={{ width: "auto" }} mt={7}>
        <img src={working} alt="Authentication" />
      </Box>
      <Box sx={{ width: "100%" }}>
        <Button variant="contained">LOGIN</Button>
      </Box>
      <Box mt={3}>
        <Button variant="text">CADASTRE-SE</Button>
      </Box>
    </>
  );
};

export default StartPage;
