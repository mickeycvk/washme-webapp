import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import PageError from "./components/PageError";
import AdminLoginPage from "./components/AdminLoginPage";
import DashBoard from "./components/DashBoard";
import AdminUserManagement from "./components/AdminUsersManagement";
import {ProtectedRoute} from "./protectedRoute"
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/adminlogin/" component={AdminLoginPage} />
        <ProtectedRoute exact path="/dashboard" component={DashBoard}/>
        <ProtectedRoute  path="/admindashboard" component={AdminUserManagement}/>
        <Route component={PageError} />
      </Switch>
    </Router>
  );
}

export default App;
