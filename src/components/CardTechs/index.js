import { Box, Button, Card, CardActionArea, CardContent, Typography } from "@material-ui/core";

const CardTechs = ({ techs }) => {
  return (
    <div>
      {techs.map((elem, index) => (
        <Box key={index} mt={2}>
        <Card  variant="outlined">
          <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {elem.title}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {elem.status}
          </Typography>
          </CardContent>
          <CardActionArea>
            <Button variant="contained" size="small">
              Excluir Tecnologia
            </Button>
          </CardActionArea>
        </Card>
        </Box>
      ))}
    </div>
  );
};

export default CardTechs;
