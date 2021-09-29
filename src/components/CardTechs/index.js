import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";

const CardTechs = ({ techs }) => {
  return (
    <Grid container justifyContent="center">
      {techs.map((elem, index) => (
        <Grid key={index} item m={3} borderRadius={5}>
          <Card sx={{bgcolor: "hsla(120, 100%, 75%, 0.3)"}}>
            <CardContent>
              <Typography variant="h5" component="div">
                {elem.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {elem.status}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" size="small">
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
