import { Switch, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import StartPage from "../pages/StartPage";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <StartPage />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </Switch>
  );
};

export default Routes;
