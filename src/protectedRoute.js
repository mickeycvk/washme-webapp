import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "./services/authService";
export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!AuthService.getCurrentUser()) {
          return <Redirect to="/" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};
