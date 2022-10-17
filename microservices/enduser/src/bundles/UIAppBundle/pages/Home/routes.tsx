import { IRoute } from "@bluelibs/x-ui";
import { withAuthRedirect } from "@bundles/UIAppBundle/hoc";
import { HomePage as Home } from "./Home";

export const HOME: IRoute = {
  path: "/home",
  component: withAuthRedirect(Home),
};
