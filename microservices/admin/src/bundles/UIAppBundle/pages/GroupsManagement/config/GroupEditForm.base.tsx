/** @overridable */
import { XRouter, use, IComponents, QueryBodyType } from "@bluelibs/x-ui";
import { XForm } from "@bluelibs/x-ui-admin";
import { Service, Inject } from "@bluelibs/core";
import { SmileOutlined } from "@ant-design/icons";
import { Routes } from "@bundles/UIAppBundle";
import * as Ant from "antd";
import {
  Group,
  ToDosCollection,
  UsersCollection,
  GroupsCollection,
} from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class GroupEditForm extends XForm {
  @Inject(() => GroupsCollection)
  collection: GroupsCollection;

  build() {
    const { UIComponents } = this;
    const { t } = this.i18n;

    this.add([
      {
        id: "title",
        label: t("management.groups.fields.title"),
        name: ["title"],
        required: true,
        component: Ant.Input,
      },

      {
        id: "userId",
        label: t("management.groups.fields.user"),
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

  static getRequestBody(): QueryBodyType<Group> {
    return {
      _id: 1,
      title: 1,
      user: {
        _id: 1,
        fullName: 1,
      },
      userId: 1,
    };
  }

  onSubmit(_id, values: Partial<Group>): Promise<void> {
    const { t } = this.i18n;

    return this.collection
      .updateOne(_id, { $set: values })
      .then(({ _id }) => {
        Ant.notification.success({
          message: t("generics.success"),
          description: t("management.groups.edit_confirmation"),
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
