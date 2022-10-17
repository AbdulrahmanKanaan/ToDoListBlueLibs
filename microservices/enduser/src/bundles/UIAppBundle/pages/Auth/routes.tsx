import { IRoute } from "@bluelibs/x-ui";
import { i18n } from "@bundles/UIAppBundle/i18n";
import { Login } from "./Login/Login";
import { Register } from "./Register/Register";

import AuthMessages from "./Auth.i18n.json";
import { withAuthRedirect } from "@bundles/UIAppBundle/hoc";

i18n.push(AuthMessages);

export const LOGIN: IRoute = {
  path: "/login",
  component: withAuthRedirect(Login, { isAuthPage: true }),
};

export const REGISTER: IRoute = {
  path: "/register",
  component: withAuthRedirect(Register, { isAuthPage: true }),
};
