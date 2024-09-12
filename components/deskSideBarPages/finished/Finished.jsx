import React, { useEffect, useState } from "react";
import WorkDetails from "../../workDetails/WorkDetails";
import { useGetExpertOrder } from "../../../core/hooks/useOrderApi";

const Finished = ({ isShow, setIsShow }) => {
  const [isExpertList, setIsExpertList] = useState();
  const { data: expertOrder, isLoading } = useGetExpertOrder({
    page: 1,
    type: "finished",
  });

  useEffect(() => {
    if (!isLoading) {
      expertOrder?.response?.data?.message === "سفارشی برا شما وجود ندارد"
        ? setIsExpertList(false)
        : setIsExpertList(true);
    }
  }, [isLoading]);
  return (
    <div className="w-full h-full bg-white rounded-xl p-3">
      <WorkDetails
        isShow={isShow}
        setIsShow={setIsShow}
        data={expertOrder}
        loading={isLoading}
      />
    </div>
  );
};

export { Finished };
