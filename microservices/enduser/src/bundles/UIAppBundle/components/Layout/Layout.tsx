import { Col, Row } from "antd";
import React from "react";

const Layout: React.FunctionComponent<any> = ({ children }) => {
  return (
    <Row justify="center" align="middle">
      <Col span={18}>{children}</Col>
    </Row>
  );
};

export default Layout;
