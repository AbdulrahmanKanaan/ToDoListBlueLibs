import React from "react";
import { Breadcrumb as AntDBreadcrumb, Typography } from "antd";
import { IRoute, useRouter } from "@bluelibs/x-ui";

interface BreadcrumbProps {
  items: {
    title: string;
    route?: IRoute;
  }[];
}

const Breadcrumb: React.FunctionComponent<BreadcrumbProps> = ({ items }) => {
  const router = useRouter();
  return (
    <>
      <AntDBreadcrumb>
        {items.map((item) => (
          <AntDBreadcrumb.Item>
            <Typography.Link
              onClick={() => item.route && router.go(item.route)}
            >
              {item.title}
            </Typography.Link>
          </AntDBreadcrumb.Item>
        ))}
      </AntDBreadcrumb>
    </>
  );
};

export default Breadcrumb;
