/** @overridable */
import { IRoute } from "@bluelibs/x-ui";
import * as React from "react";
import { GroupsList } from "../components/List/GroupsList";
import { GroupsCreate } from "../components/Create/GroupsCreate";
import { GroupsEdit } from "../components/Edit/GroupsEdit";
import { GroupsView } from "../components/View/GroupsView";

import { SettingFilled } from "@ant-design/icons";

export const GROUPS_LIST: IRoute = {
  path: "/admin/groups",
  component: GroupsList,
  menu: {
    key: "GROUPS_LIST",
    label: "management.groups.menu.title",
    icon: SettingFilled,
  },
};

export const GROUPS_CREATE: IRoute = {
  path: "/admin/groups/create",
  component: GroupsCreate,
};

export const GROUPS_EDIT: IRoute<{ id: string }> = {
  path: "/admin/groups/:id/edit",
  component: GroupsEdit,
};

export const GROUPS_VIEW: IRoute<{ id: string }> = {
  path: "/admin/groups/:id/view",
  component: GroupsView,
};
