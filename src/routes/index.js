import { Switch, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import StartPage from "../pages/StartPage";
import Dashboard from "../pages/Dashboard";

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
      <Route path="/dashboard">
        <Dashboard />
      </Route>
    </Switch>
  );
};

export default Routes;
