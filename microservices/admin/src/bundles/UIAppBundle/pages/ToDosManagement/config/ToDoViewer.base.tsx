/** @overridable */
import { ToDo } from "@root/api.types";
import { Service } from "@bluelibs/core";
import { QueryBodyType, XRouter, IComponents } from "@bluelibs/x-ui";
import { XViewElementType, XViewer } from "@bluelibs/x-ui-admin";
import * as Ant from "antd";
import { Routes } from "@bundles/UIAppBundle";

@Service({ transient: true })
export class ToDoViewer extends XViewer {
  build() {
    const { UIComponents, router } = this;
    const { t } = this.i18n;

    this.add([
      {
        id: "_id",
        label: t("management.to_dos.fields._id"),
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
        id: "content",
        label: t("management.to_dos.fields.content"),
        dataIndex: ["content"],
        render: (value) => {
          const props = {
            type: "string",
            value,
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
      {
        id: "order",
        label: t("management.to_dos.fields.order"),
        dataIndex: ["order"],
        render: (value) => {
          const props = {
            type: "number",
            value,
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
      {
        id: "isDone",
        label: t("management.to_dos.fields.isDone"),
        dataIndex: ["isDone"],
        render: (value) => {
          const props = {
            type: "boolean",
            value,
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
      {
        id: "group",
        label: t("management.to_dos.fields.group"),
        dataIndex: ["group"],
        render: (value) => {
          const props = {
            type: "relation",
            value,
            relation: {
              path: router.path(Routes.GROUPS_VIEW, {
                params: {
                  id: value?._id,
                },
              }),
              dataIndex: "title",
            },
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
      {
        id: "user",
        label: t("management.to_dos.fields.user"),
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

  static getRequestBody(): QueryBodyType<ToDo> {
    return {
      _id: 1,
      content: 1,
      order: 1,
      isDone: 1,
      group: {
        _id: 1,
        title: 1,
      },
      groupId: 1,
      user: {
        _id: 1,
        fullName: 1,
      },
      userId: 1,
    };
  }
}
