/** @overridable */
import { Group } from "@root/api.types";
import { Service } from "@bluelibs/core";
import { QueryBodyType, XRouter, IComponents } from "@bluelibs/x-ui";
import { XViewElementType, XViewer } from "@bluelibs/x-ui-admin";
import * as Ant from "antd";
import { Routes } from "@bundles/UIAppBundle";

@Service({ transient: true })
export class GroupViewer extends XViewer {
  build() {
    const { UIComponents, router } = this;
    const { t } = this.i18n;

    this.add([
      {
        id: "_id",
        label: t("management.groups.fields._id"),
        dataIndex: ["_id"],
        render: (value) => {
          const props = {
            type: "objectId",
            value,
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
      {
        id: "title",
        label: t("management.groups.fields.title"),
        dataIndex: ["title"],
        render: (value) => {
          const props = {
            type: "string",
            value,
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
      {
        id: "todos",
        label: t("management.groups.fields.todos"),
        dataIndex: ["todos"],
        render: (value) => {
          const props = {
            type: "relation",
            value,
            relation: {
              path: router.path(Routes.TO_DOS_VIEW, {
                params: {
                  id: value?._id,
                },
              }),
              dataIndex: "content",
            },
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
      {
        id: "user",
        label: t("management.groups.fields.user"),
        dataIndex: ["user"],
        render: (value) => {
          const props = {
            type: "relation",
            value,
            relation: {
              path: router.path(Routes.USERS_VIEW, {
                params: {
                  id: value?._id,
                },
              }),
              dataIndex: "fullName",
            },
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
    ]);
  }

  static getRequestBody(): QueryBodyType<Group> {
    return {
      _id: 1,
      title: 1,
      todos: {
        _id: 1,
        content: 1,
      },
      user: {
        _id: 1,
        fullName: 1,
      },
      userId: 1,
    };
  }
}
