import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getUser, getUserId } from "./Common";

export default function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !getUserId() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/home" }} />
        )
      }
    />
  );
}
