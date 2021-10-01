import axios from "axios";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";

const CardTechs = ({ setTechs, techs, token, user }) => {

  const handleDelete = (tech) => {
    axios
      .delete(`https://kenziehub.herokuapp.com/users/techs/${tech.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        axios
          .get(`https://kenziehub.herokuapp.com/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            setTechs(response.data.techs);
            alert("Tecnologia excluída com sucesso!")
          });
      })
      .catch((error) => {
        // Error 😨
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          alert(error.response.data);
        } else {
          // Something happened in setting up the request and triggered an Error
          console.log("Error", error.message);
        }
      });
  };

  return (
    <Grid container justifyContent="center">
      {techs.map((tech) => (
        <Grid item key={tech.id} m={3} borderRadius={5}>
          <Card sx={{ bgcolor: "hsla(120, 100%, 75%, 0.3)" }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {tech.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {tech.status}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                size="small"
                onClick={() => handleDelete(tech)}
              >
                Excluir Tecnologia
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CardTechs;
