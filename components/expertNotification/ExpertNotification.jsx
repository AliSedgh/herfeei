import { WarningRounded } from "@mui/icons-material";
import { useGetNotifacations } from "../../core/hooks/useExpertApi";
import {
  InfoNotif,
  StatusNotification,
  SuccessNotif,
} from "../statusNotification/StatusNotification";
import { useQueryClient } from "react-query";
import { useEffect } from "react";

const ExpertNotification = ({ clickSideBar }) => {
  const { data: notifications, isLoading, refetch } = useGetNotifacations();
  console.log("ffff", notifications);

  return (
    !isLoading && (
      <div className="w-full rounded-md bg-transparent sm:bg-white lg:p-[24px_80px] flex flex-col items-center gap-2">
        {notifications?.length === 0 ? (
          <div className="felx justify-center items-center">
            <WarningRounded className="text-orange-400 relative top-2 left-2" />
            درحال حاضر اعلانی وجود ندارد
          </div>
        ) : (
          notifications?.map((notifItems, index) => (
            <StatusNotification key={index} data={notifItems} />
          ))
        )}
      </div>
    )
  );
};

export { ExpertNotification };
