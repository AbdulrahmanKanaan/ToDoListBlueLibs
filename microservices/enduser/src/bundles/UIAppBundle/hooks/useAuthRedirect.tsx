import { IRoute, useRouter } from "@bluelibs/x-ui";
import React, { useEffect, useMemo } from "react";
import { useAppGuardian } from "../services/AppGuardian";
import { Routes } from "..";
import { notification } from "antd";

type Options = {
  isAuthPage: boolean;
  loginRoute: IRoute;
  homeRoute: IRoute;
};

const getDefaultOptions = () =>
  ({
    isAuthPage: false,
    loginRoute: Routes.LOGIN,
    homeRoute: Routes.HOME,
  } as Options);

export default function useAuthRedirect(options: Partial<Options> = {}) {
  const { isAuthPage, homeRoute, loginRoute } = useMemo(
    () => ({
      ...getDefaultOptions(),
      ...options,
    }),
    [options]
  );

  const {
    state: { isLoggedIn, initialised: initialized },
  } = useAppGuardian();

  const router = useRouter();

  useEffect(() => {
    if (!initialized) return;
    if (isLoggedIn && isAuthPage) {
      router.go(homeRoute);
    } else if (!isLoggedIn && !isAuthPage) {
      notification.error({
        message: "Please Login!",
      });
      router.go(loginRoute);
    }
  }, [homeRoute, initialized, isLoggedIn, isAuthPage, loginRoute, router]);
}
