import React from "react";
import { useAuthRedirect } from "../hooks";
import { GROUPS } from "../routes";

export default function withAuthRedirect(WrappedComponent, options = {}) {
  return function (props) {
    useAuthRedirect({
      homeRoute: GROUPS,
      ...options,
    });
    return <WrappedComponent {...props} />;
  };
}
