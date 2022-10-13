import { IRoute } from "@bluelibs/x-ui";
import "./i18n";

import {
  TO_DOS_LIST as BASE_TO_DOS_LIST,
  TO_DOS_CREATE as BASE_TO_DOS_CREATE,
  TO_DOS_EDIT as BASE_TO_DOS_EDIT,
  TO_DOS_VIEW as BASE_TO_DOS_VIEW,
} from "./config/routes";

export const TO_DOS_LIST: IRoute = {
  ...BASE_TO_DOS_LIST,
};

export const TO_DOS_CREATE: IRoute = {
  ...BASE_TO_DOS_CREATE,
};

export const TO_DOS_EDIT: IRoute = {
  ...BASE_TO_DOS_EDIT,
};

export const TO_DOS_VIEW: IRoute = {
  ...BASE_TO_DOS_VIEW,
};
