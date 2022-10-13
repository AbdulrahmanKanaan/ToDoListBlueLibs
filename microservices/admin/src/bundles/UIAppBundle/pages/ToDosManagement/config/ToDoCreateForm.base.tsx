/** @overridable */
import { XRouter, use, IComponents } from "@bluelibs/x-ui";
import { SmileOutlined } from "@ant-design/icons";
import * as Ant from "antd";
import { XFormElementType, XForm } from "@bluelibs/x-ui-admin";
import { Routes } from "@bundles/UIAppBundle";
import { Service, Inject } from "@bluelibs/core";
import { features } from "./features";
import {
  ToDo,
  GroupsCollection,
  UsersCollection,
  ToDosCollection,
} from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class ToDoCreateForm extends XForm {
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

  onSubmit(document: Partial<ToDo>): Promise<void> {
    const { t } = this.i18n;

    return this.collection
      .insertOne(document)
      .then(({ _id }) => {
        Ant.notification.success({
          message: t("generics.success"),
          description: t("management.to_dos.create_confirmation"),
          icon: <SmileOutlined />,
        });

        if (features.view) {
          return this.router.go(Routes.TO_DOS_VIEW, {
            params: {
              id: _id,
            },
          });
        }
        if (features.list) {
          return this.router.go(Routes.TO_DOS_LIST);
        }
        if (features.edit) {
          return this.router.go(Routes.TO_DOS_EDIT, {
            params: {
              id: _id,
            },
          });
        }
      })
      .catch((err) => {
        Ant.notification.warn({
          message: t("generics.error"),
          description: t("generics.error_message"),
        });
      });
  }
}
