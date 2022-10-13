/** @overridable */
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { XFormElementType, XList, XForm } from "@bluelibs/x-ui-admin";
import { Routes } from "@bundles/UIAppBundle";
import { Service } from "@bluelibs/core";
import { IComponents, XRouter, use, QueryBodyType } from "@bluelibs/x-ui";
import * as Ant from "antd";
import {
  Group,
  ToDosCollection,
  UsersCollection,
  GroupsCollection,
} from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class GroupList extends XList<Group> {
  build() {
    const { UIComponents, router } = this;
    const { t } = this.i18n;

    this.add([
      {
        id: "title",
        title: t("management.groups.fields.title"),
        key: "management.groups.fields.title",
        dataIndex: ["title"],
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
        id: "todos",
        title: t("management.groups.fields.todos"),
        key: "management.groups.fields.todos",
        dataIndex: ["todos"],
        sorter: true,
        render: (value, model) => {
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
        title: t("management.groups.fields.user"),
        key: "management.groups.fields.user",
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
      todos: "todos.content",
      user: "user.fullName",
    };
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
