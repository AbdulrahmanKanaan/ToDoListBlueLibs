/** @overridable */
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { XFormElementType, XList, XForm } from "@bluelibs/x-ui-admin";
import { Routes } from "@bundles/UIAppBundle";
import { Service } from "@bluelibs/core";
import { IComponents, XRouter, use, QueryBodyType } from "@bluelibs/x-ui";
import * as Ant from "antd";
import {
  ToDo,
  GroupsCollection,
  UsersCollection,
  ToDosCollection,
} from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class ToDoList extends XList<ToDo> {
  build() {
    const { UIComponents, router } = this;
    const { t } = this.i18n;

    this.add([
      {
        id: "content",
        title: t("management.to_dos.fields.content"),
        key: "management.to_dos.fields.content",
        dataIndex: ["content"],
        sorter: true,
        render: (value, model) => {
          const props = {
            type: "string",
            value,
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
      {
        id: "order",
        title: t("management.to_dos.fields.order"),
        key: "management.to_dos.fields.order",
        dataIndex: ["order"],
        sorter: true,
        render: (value, model) => {
          const props = {
            type: "number",
            value,
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
      {
        id: "isDone",
        title: t("management.to_dos.fields.isDone"),
        key: "management.to_dos.fields.isDone",
        dataIndex: ["isDone"],
        sorter: true,
        render: (value, model) => {
          const props = {
            type: "boolean",
            value,
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
      {
        id: "group",
        title: t("management.to_dos.fields.group"),
        key: "management.to_dos.fields.group",
        dataIndex: ["group"],
        sorter: true,
        render: (value, model) => {
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
        title: t("management.to_dos.fields.user"),
        key: "management.to_dos.fields.user",
        dataIndex: ["user"],
        sorter: true,
        render: (value, model) => {
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

  static getSortMap() {
    return {
      group: "group.title",
      user: "user.fullName",
    };
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
