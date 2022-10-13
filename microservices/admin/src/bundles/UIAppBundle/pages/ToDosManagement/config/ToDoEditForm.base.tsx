/** @overridable */
import { XRouter, use, IComponents, QueryBodyType } from "@bluelibs/x-ui";
import { XForm } from "@bluelibs/x-ui-admin";
import { Service, Inject } from "@bluelibs/core";
import { SmileOutlined } from "@ant-design/icons";
import { Routes } from "@bundles/UIAppBundle";
import * as Ant from "antd";
import {
  ToDo,
  GroupsCollection,
  UsersCollection,
  ToDosCollection,
} from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class ToDoEditForm extends XForm {
  @Inject(() => ToDosCollection)
  collection: ToDosCollection;

  build() {
    const { UIComponents } = this;
    const { t } = this.i18n;

    this.add([
      {
        id: "content",
        label: t("management.to_dos.fields.content"),
        name: ["content"],
        required: true,
        component: Ant.Input,
      },

      {
        id: "order",
        label: t("management.to_dos.fields.order"),
        name: ["order"],
        required: true,
        component: Ant.InputNumber,
      },

      {
        id: "isDone",
        label: t("management.to_dos.fields.isDone"),
        name: ["isDone"],
        required: true,
        render: (props) => (
          <Ant.Form.Item {...props}>
            <Ant.Radio.Group>
              <Ant.Radio value={false} key={0}>
                No
              </Ant.Radio>
              <Ant.Radio value={true} key={1}>
                Yes
              </Ant.Radio>
            </Ant.Radio.Group>
          </Ant.Form.Item>
        ),
      },

      {
        id: "groupId",
        label: t("management.to_dos.fields.group"),
        name: ["groupId"],
        required: true,
        render: (props) => (
          <Ant.Form.Item {...props}>
            <UIComponents.RemoteSelect
              collectionClass={GroupsCollection}
              field="title"
              required={true}
            />
          </Ant.Form.Item>
        ),
      },

      {
        id: "userId",
        label: t("management.to_dos.fields.user"),
        name: ["userId"],
        required: true,
        render: (props) => (
          <Ant.Form.Item {...props}>
            <UIComponents.RemoteSelect
              collectionClass={UsersCollection}
              field="fullName"
              required={true}
            />
          </Ant.Form.Item>
        ),
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

  onSubmit(_id, values: Partial<ToDo>): Promise<void> {
    const { t } = this.i18n;

    return this.collection
      .updateOne(_id, { $set: values })
      .then(({ _id }) => {
        Ant.notification.success({
          message: t("generics.success"),
          description: t("management.to_dos.edit_confirmation"),
          icon: <SmileOutlined />,
        });
      })
      .catch((err) => {
        Ant.notification.warn({
          message: t("generics.error"),
          description: t("generics.error_message"),
        });
      });
  }
}
