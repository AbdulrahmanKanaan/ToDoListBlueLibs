import { IRoute } from "@bluelibs/x-ui";
import { i18n } from "@bundles/UIAppBundle/i18n";
import { Login } from "./Login/Login";
import { Register } from "./Register/Register";

import AuthMessages from "./Auth.i18n.json";

i18n.push(AuthMessages);

export const LOGIN: IRoute = {
  path: "/login",
  component: Login,
};

export const REGISTER: IRoute = {
  path: "/register",
  component: Register,
};
