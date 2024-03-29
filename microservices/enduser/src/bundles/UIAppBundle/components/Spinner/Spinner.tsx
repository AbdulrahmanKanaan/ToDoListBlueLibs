import { Spin } from "antd";
import React from "react";
import "./Spinner.scss";

interface ISpinnerProps {
  spinning?: boolean;
  tip?: string;
  size?: "default" | "large" | "small";
}

const Spinner: React.FunctionComponent<ISpinnerProps> = ({
  spinning = true,
  tip,
  size,
  children,
}) => {
  console.log(children);

  return (
    <>
      <div className="spinner-container">
        <Spin spinning={spinning} tip={tip} size={size}>
          {children}
        </Spin>
      </div>
    </>
  );
};

export default Spinner;
