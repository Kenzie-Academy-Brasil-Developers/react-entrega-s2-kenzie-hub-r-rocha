import { AppBar, MenuItem, Toolbar } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Menu = () => {
  const history = useHistory();

  const sendTo = (path) => {
    history.push(path);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <MenuItem onClick={() => sendTo("/home")}>Home</MenuItem>
        <MenuItem onClick={() => sendTo("/login")}>Login</MenuItem>
        <MenuItem onClick={() => sendTo("/register")}>Register</MenuItem>
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
