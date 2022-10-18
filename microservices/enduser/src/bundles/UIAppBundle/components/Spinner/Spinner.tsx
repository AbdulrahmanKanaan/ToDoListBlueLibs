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
}) => {
  return (
    <>
      <div className="spinner-container">
        <Spin spinning={spinning} tip={tip} size={size} />
      </div>
    </>
  );
};

export default Spinner;
