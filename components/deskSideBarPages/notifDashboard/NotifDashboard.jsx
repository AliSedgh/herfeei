import React, { useEffect } from "react";
import { ExpertNotification } from "../../expertNotification/ExpertNotification";

const NotifDashboard = ({ clickSideBar }) => {
  return (
    <div className="w-full h-full bg-white rounded-xl p-3">
      <ExpertNotification />
    </div>
  );
};

export { NotifDashboard };
