import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getUser } from "./Common";

export default function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !getUser() ? (
          <Component {...props} />
        ) : (
          <Redirect to={ "/" } />
        )
      }
    />
  );
}
