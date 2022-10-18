import React from "react";
import { useAuthRedirect } from "../hooks";
import { GROUPS } from "../routes";
import { useAppGuardian } from "../services/AppGuardian";

export default function withAuthRedirect(WrappedComponent, options = {}) {
  return function (props) {
    const { state } = useAppGuardian();
    useAuthRedirect({
      homeRoute: GROUPS,
      ...options,
    });
    if (!state.initialised) return <></>;
    return <WrappedComponent {...props} />;
  };
}
