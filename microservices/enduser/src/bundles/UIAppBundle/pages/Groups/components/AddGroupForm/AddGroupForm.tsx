import { PlusCircleFilled } from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import "./AddGroupForm.scss";

interface Props {
  onFormSubmit(group: { title: string }): void;
}

const AddGroupForm: React.FunctionComponent<Props> = ({ onFormSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    onFormSubmit({
      title: form.getFieldValue("title"),
    });

    form.resetFields();
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="horizontal"
      className="group-form"
    >
      <Row gutter={20}>
        <Col span={20}>
          <Form.Item
            name={"title"}
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Input placeholder="New group? work, study, home... etc" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Button type="primary" htmlType="submit" block>
            <PlusCircleFilled />
            Add group
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddGroupForm;
