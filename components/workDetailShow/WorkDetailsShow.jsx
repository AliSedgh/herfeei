import React from "react";
import { DeskOrder } from "../deskOrder/DeskOrder";

const WorkDetailsShow = ({ id, data }) => {
  return <DeskOrder status={data?.status} data={data} />;
};

export default WorkDetailsShow;
