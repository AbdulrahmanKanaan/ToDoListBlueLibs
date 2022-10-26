import { IRoute } from "@bluelibs/x-ui";
import { withAuthRedirect } from "@bundles/UIAppBundle/hoc";
import Groups from "./Groups";

export const GROUPS: IRoute = {
  path: "/",
  component: withAuthRedirect(Groups),
};
