import { IRoute } from "@bluelibs/x-ui";
import { withAuthRedirect } from "@bundles/UIAppBundle/hoc";
import { ToDos } from "./ToDos";

export const TODOS: IRoute = {
  path: "/todos/:id",
  component: withAuthRedirect(ToDos),
};
