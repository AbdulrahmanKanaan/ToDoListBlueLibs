/** @overridable */
import { notification } from "antd";
import { XFormElementType, XList, XForm } from "@bluelibs/x-ui-admin";
import { Service } from "@bluelibs/core";
import { IComponents, XRouter, use } from "@bluelibs/x-ui";
import * as Ant from "antd";
import {
  ToDo,
  GroupsCollection,
  UsersCollection,
  ToDosCollection,
} from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class ToDoListFiltersForm extends XForm {
  build() {
    const { UIComponents } = this;
    const { t } = this.i18n;

    this.add([
      {
        id: "content",
        label: t("management.to_dos.fields.content"),
        name: ["content"],
        render: (props) => (
          <Ant.Form.Item {...props}>
            <Ant.Input />
          </Ant.Form.Item>
        ),
      },

      {
        id: "order",
        label: t("management.to_dos.fields.order"),
        name: ["order"],
        render: (props) => (
          <Ant.Form.Item {...props}>
            <Ant.Slider range step={10} min={0} max={100000} />
          </Ant.Form.Item>
        ),
      },

      {
        id: "isDone",
        label: t("management.to_dos.fields.isDone"),
        name: ["isDone"],
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
        render: (props) => (
          <Ant.Form.Item {...props}>
            <UIComponents.RemoteSelect
              collectionClass={GroupsCollection}
              field="title"
              placeholder="Please select an option"
              mode="multiple"
            />
          </Ant.Form.Item>
        ),
      },

      {
        id: "userId",
        label: t("management.to_dos.fields.user"),
        name: ["userId"],
        render: (props) => (
          <Ant.Form.Item {...props}>
            <UIComponents.RemoteSelect
              collectionClass={UsersCollection}
              field="fullName"
              placeholder="Please select an option"
              mode="multiple"
            />
          </Ant.Form.Item>
        ),
      },
    ]);
  }
}
