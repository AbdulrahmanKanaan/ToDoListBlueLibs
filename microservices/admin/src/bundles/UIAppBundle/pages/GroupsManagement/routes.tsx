import { IRoute } from "@bluelibs/x-ui";
import "./i18n";

import {
  GROUPS_LIST as BASE_GROUPS_LIST,
  GROUPS_CREATE as BASE_GROUPS_CREATE,
  GROUPS_EDIT as BASE_GROUPS_EDIT,
  GROUPS_VIEW as BASE_GROUPS_VIEW,
} from "./config/routes";

export const GROUPS_LIST: IRoute = {
  ...BASE_GROUPS_LIST,
};

export const GROUPS_CREATE: IRoute = {
  ...BASE_GROUPS_CREATE,
};

export const GROUPS_EDIT: IRoute = {
  ...BASE_GROUPS_EDIT,
};

export const GROUPS_VIEW: IRoute = {
  ...BASE_GROUPS_VIEW,
};
