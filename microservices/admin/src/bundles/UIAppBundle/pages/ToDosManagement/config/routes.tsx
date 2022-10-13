/** @overridable */
import { IRoute } from "@bluelibs/x-ui";
import * as React from "react";
import { ToDosList } from "../components/List/ToDosList";
import { ToDosCreate } from "../components/Create/ToDosCreate";
import { ToDosEdit } from "../components/Edit/ToDosEdit";
import { ToDosView } from "../components/View/ToDosView";

import { SettingFilled } from "@ant-design/icons";

export const TO_DOS_LIST: IRoute = {
  path: "/admin/to-dos",
  component: ToDosList,
  menu: {
    key: "TO_DOS_LIST",
    label: "management.to_dos.menu.title",
    icon: SettingFilled,
  },
};

export const TO_DOS_CREATE: IRoute = {
  path: "/admin/to-dos/create",
  component: ToDosCreate,
};

export const TO_DOS_EDIT: IRoute<{ id: string }> = {
  path: "/admin/to-dos/:id/edit",
  component: ToDosEdit,
};

export const TO_DOS_VIEW: IRoute<{ id: string }> = {
  path: "/admin/to-dos/:id/view",
  component: ToDosView,
};
