import { PlusCircleFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";
import React, { useState } from "react";

import "./AddTodoForm.scss";

interface IAddTodoFormProps {
  onFormSubmit: (todo: { content: string }) => Promise<void>;
}

const AddTodoForm: React.FC<IAddTodoFormProps> = ({ onFormSubmit }) => {
  const [isActive, setActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const onFinish = () => {
    setLoading(true);
    onFormSubmit({
      content: form.getFieldValue("content"),
    })
      .then(() => {
        setActive(false);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });

    form.resetFields();
  };

  return isActive ? (
    <div className="todo-form">
      <Form form={form} onFinish={onFinish} layout="horizontal">
        <Form.Item
          name={"content"}
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input.Search
            placeholder="What needs to be done?"
            size="large"
            autoComplete="off"
            onSearch={form.submit}
            enterButton={"Add"}
            loading={loading}
            disabled={loading}
            autoFocus
          />
        </Form.Item>
      </Form>
    </div>
  ) : (
    <div className="todo-form-button">
      <Button block size="large" onClick={() => setActive(true)}>
        <PlusOutlined />
      </Button>
    </div>
  );
};

export default AddTodoForm;
