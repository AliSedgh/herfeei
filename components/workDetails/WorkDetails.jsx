import Image from "next/image";
import Clock from "../../public/icons/clock2.svg";
import moment from "jalali-moment";
import { useState } from "react";
import WorkDetailsShow from "../workDetailShow/WorkDetailsShow";
import { Button } from "@mui/material";
import { ArrowRightAlt } from "@mui/icons-material";
import { format } from "date-fns-jalali";
import { faIR } from "date-fns-jalali/locale";

const WorkDetails = ({ data, loading, isShow, setIsShow }) => {
  const [orderData, setOrderData] = useState();

  const handleClick = (myDAta) => {
    setIsShow(!isShow);
    setOrderData(myDAta);
  };
  return loading ? (
    <></>
  ) : isShow ? (
    <div className="w-full rounded-md bg-white lg:p-[24px_80px] flex flex-col items-center justify-center gap-6">
      <div className="w-full flex justify-start"></div>
      <WorkDetailsShow data={orderData} />
    </div>
  ) : (
    <div className="w-full rounded-md bg-white lg:p-[24px_80px] flex flex-col items-end gap-6">
      <h3 className="text-right w-full text-neutral-800 text-sm sm:text-base font-semibold leading-snug">
        جزئیات کارها
      </h3>
      <div className="w-full flex flex-col gap-6">
        {data?.results.filter((finished) => finished?.status === "FINISHED")
          ?.length == 0 && (
          <p className="text-center font-semibold">
            هنوز کاری به اتمام نرسیده است
          </p>
        )}
        {data?.results
          ?.filter((finished) => finished?.status === "FINISHED")
          .map((order) => (
            <div
              key={order?.order_track_id}
              className="w-full sm:w-[341px] p-4 bg-white rounded-lg [border:1px_solid_#D9D9D9] [box-shadow:_0px_0px_8px_0px_rgba(97,100,117,0.20)] flex flex-col gap-2 cursor-pointer hover:bg-stone-100"
              onClick={() => handleClick(order)}
            >
              <div className="flex flex-row-reverse justify-end items-center gap-4 self-stretch">
                <div className="w-auto 2xs:w-[244px] flex flex-col gap-[6px] shrink-0">
                  <b className="text-[12px] 2xs:text-[16px] text-right font-[600] leading-[160%] text-[#212121]">
                    {order?.service.category.title}
                  </b>
                  <span className="text-[#6F767E] text-[10px] 2xs:text-[14px] font-[400] leading-[140%] text-right">
                    کد پیگیری: {order?.order_track_id}
                  </span>
                </div>
                <div className="w-[50px] h-[50px] rounded-[4px] [border:1px_solid_#d6d6d6] flex justify-center items-center p-[3px] bg-white relative">
                  <Image
                    src={order?.service.category.category_image}
                    alt="orderPic"
                    fill
                  />
                </div>
              </div>
              <div className="flex flex-end items-center gap-2">
                <div className="relative w-[24px] h-[24px] p-[2.75px]">
                  <Image src={Clock} alt="clock" fill />
                </div>
                <span className="text-[#333334] text-[10px] 2xs:text-[14px] font-[400] leading-[140%] text-right">
                  {order?.order_date === null
                    ? ""
                    : format(new Date(order?.order_date), "EEEE dd MMMM", {
                        locale: faIR,
                      }) +
                      " ساعت " +
                      (order?.order_time.split("-")[0] > 12
                        ? order?.order_time.split("-")[0] - 12
                        : order?.order_time.split("-")[0]) +
                      " " +
                      (order?.order_time.split("-")[0] > 3 &&
                      order?.order_time.split("-")[0] < 12
                        ? "صبح"
                        : order?.order_time.split("-")[0] >= 12 &&
                          order?.order_time.split("-")[0] < 14
                        ? "ظهر"
                        : order?.order_time.split("-")[0] >= 14 &&
                          order?.order_time.split("-")[0] < 17
                        ? "بعد از ظهر"
                        : order?.order_time.split("-")[0] >= 17 &&
                          order?.order_time.split("-")[0] < 20
                        ? "غروب"
                        : "شب")}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WorkDetails;
