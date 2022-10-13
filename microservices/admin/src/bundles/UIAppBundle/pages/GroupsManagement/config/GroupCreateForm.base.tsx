/** @overridable */
import { XRouter, use, IComponents } from "@bluelibs/x-ui";
import { SmileOutlined } from "@ant-design/icons";
import * as Ant from "antd";
import { XFormElementType, XForm } from "@bluelibs/x-ui-admin";
import { Routes } from "@bundles/UIAppBundle";
import { Service, Inject } from "@bluelibs/core";
import { features } from "./features";
import {
  Group,
  ToDosCollection,
  UsersCollection,
  GroupsCollection,
} from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class GroupCreateForm extends XForm {
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

  onSubmit(document: Partial<Group>): Promise<void> {
    const { t } = this.i18n;

    return this.collection
      .insertOne(document)
      .then(({ _id }) => {
        Ant.notification.success({
          message: t("generics.success"),
          description: t("management.groups.create_confirmation"),
          icon: <SmileOutlined />,
        });

        if (features.view) {
          return this.router.go(Routes.GROUPS_VIEW, {
            params: {
              id: _id,
            },
          });
        }
        if (features.list) {
          return this.router.go(Routes.GROUPS_LIST);
        }
        if (features.edit) {
          return this.router.go(Routes.GROUPS_EDIT, {
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
