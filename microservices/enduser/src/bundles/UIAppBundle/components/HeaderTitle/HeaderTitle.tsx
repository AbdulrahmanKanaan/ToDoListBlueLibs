import { Row, Col, Typography } from "antd";

interface IHeaderTitleProps {
  title: string;
}

export const HeaderTitle: React.FunctionComponent<IHeaderTitleProps> = ({
  title,
}) => {
  return (
    <>
      <Row justify="center">
        <Col span={18}>
          <Typography.Title style={{ textAlign: "center", margin: 20 }}>
            {title}
          </Typography.Title>
        </Col>
      </Row>
    </>
  );
};
