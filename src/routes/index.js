import { Switch, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import StartPage from "../pages/StartPage";
import Dashboard from "../pages/Dashboard";
import { useState } from "react";

const Routes = () => {
  const [authenticated, setAuthenticated] = useState(false);

  
  return (
    <Switch>
      <Route exact path="/">
        <StartPage />
      </Route>
      <Route path="/login">
        <Login setAuthenticated={setAuthenticated} />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/dashboard">
        <Dashboard
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
    </Switch>
  );
};

export default Routes;
