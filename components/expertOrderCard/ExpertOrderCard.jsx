import Image from "next/image";
import { useState } from "react";
import Location from "../../public/icons/location2.svg";
import Clock from "../../public/icons/clock2.svg";
import infoPic from "../../public/icons/info.svg";
import {
  Accepted,
  GeneralInformation,
  GoingToWork,
  Invoice,
  Started,
  User,
} from "../orderCards/OrderCards.jsx";
import { Details } from "../orderCards/OrderCards.jsx";
import moment from "jalali-moment";
import { format } from "date-fns-jalali";
import { faIR } from "date-fns-jalali/locale";

const ExpertOrderCard = ({
  status,
  Key,
  data,
  handleClick,
  allData,
  setAllData,
}) => {
  const neighborhood =
    data?.user_address?.neighborhood === undefined
      ? ""
      : data?.user_address?.neighborhood;
  const details =
    data?.user_address?.details == null ? "" : data?.user_address?.details;
  const title = data?.user_address?.title ?? "";
  const fullAddress = neighborhood + " " + details + " " + title;
  const timeData =
    data?.order_time === null ? "" : data?.order_time?.split("-")[0];
  const time = timeData > 12 ? timeData - 12 : timeData;

  const [isFull, setIsFull] = useState(true);

  const success =
    "flex p-[2px_8px] items-center gap-[10px] rounded-[5px] bg-[rgba(74,222,128,0.10)] text-[#4ADE80] text-[12px] 2xs:text-[16px]";
  const warning =
    "flex p-[2px_8px] items-center gap-[10px] rounded-[5px] bg-[rgba(255,193,0,0.10)] text-[#FFC100] text-[10px] 2xs:text-[16px]";
  const info =
    "flex p-[2px_8px] items-center gap-[10px] rounded-[5px] bg-[rgba(104,160,255,0.10)] text-[#68A0FF] text-[12px] 2xs:text-[16px]";
  const draft =
    "flex p-[2px_8px] items-center gap-[10px] rounded-[5px] bg-[rgba(153,155,167,0.10)] text-[#999BA7] text-[12px] 2xs:text-[16px]";
  const danger =
    "flex p-[2px_8px] items-center gap-[10px] rounded-[5px] bg-[rgba(247,85,85,0.10)] text-[#F75555] text-[12px] 2xs:text-[16px]";

  const convertToJalaliDate = (gregorianDate) => {
    // تبدیل تاریخ میلادی به تاریخ شمسی و قالب‌بندی آن
    return format(new Date(gregorianDate), "EEEE dd MMMM", { locale: faIR });
  };

  const calculateTotalCost = (invoice) => {
    const { service_cost, expertise, equipment_cost, transportation_cost } =
      invoice;

    let total = 0;
    if (
      service_cost &&
      service_cost !== null &&
      service_cost !== undefined &&
      service_cost !== 0 &&
      service_cost > 0
    )
      total += service_cost;
    if (
      expertise &&
      expertise !== null &&
      expertise !== undefined &&
      expertise !== 0 &&
      expertise > 0
    )
      total += expertise;
    if (
      equipment_cost &&
      equipment_cost !== null &&
      equipment_cost !== undefined &&
      equipment_cost !== 0 &&
      equipment_cost > 0
    )
      total += equipment_cost;
    if (
      transportation_cost &&
      transportation_cost !== null &&
      transportation_cost !== undefined &&
      transportation_cost !== 0 &&
      transportation_cost > 0
    )
      total += transportation_cost;
    if (
      data?.deposit?.deposit &&
      data?.deposit?.deposit_paid &&
      data?.deposit?.deposit !== null &&
      data?.deposit?.deposit !== undefined &&
      data?.deposit?.deposit !== 0 &&
      data?.deposit?.deposit > 0
    )
      total -= data?.deposit?.deposit;

    return total;
  };

  const totalCost = calculateTotalCost(data?.invoice || {});

  return (
    <>
      <div
        key={Key}
        className="w-full md:w-[48%] xl:w-[397px] p-4 flex flex-col justify-between items-start gap-4 shrink-0 rounded-[8px] [border:1px_solid_#d9d9d9] [box-shadow:0px_0px_8px_0px_rgba(97,100,117,0.20)] bg-white"
      >
        <div className="flex justify-end items-center gap-4 self-stretch">
          <div className="w-auto 2xs:w-[244px] flex flex-col gap-[6px] shrink-0">
            <b className="text-[12px] 2xs:text-[16px] text-right font-[600] leading-[160%] text-[#212121]">
              {data?.service?.category?.title}
            </b>
            <span className="text-[#6F767E] text-[10px] 2xs:text-[14px] font-[400] leading-[140%] text-right">
              کد پیگیری: {data?.order_track_id}
            </span>
          </div>
          <div className="w-[50px] h-[50px] rounded-[4px] [border:1px_solid_#d6d6d6] flex justify-center items-center p-[3px] bg-white relative">
            <Image
              src={data?.service?.category?.category_image}
              alt="orderPic"
              fill
            />
          </div>
        </div>
        <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />
        <div className="flex flex-row-reverse justify-between items-center gap-[7px] self-stretch">
          <span className="text-[#6F767E] text-[12px] 2xs:text-[14px] font-[400] leading-[140%] text-right">
            :وضعیت سفارش
          </span>
          <div className="flex flex-row-reverse gap-2">
            {status === "DEPOSIT" ? (
              <span
                className="w-6 h-6 p-[2px] flex items-center justify-center relative cursor-pointer"
                onClick={handleClick}
              >
                <Image src={infoPic} alt="help" fill />
              </span>
            ) : (
              <></>
            )}

            <span
              className={
                status === "USER_ACCEPTED" ||
                status === "EXPERT_ACCEPTED" ||
                status === "STARTED" ||
                status === "DEPOSIT_PAID"
                  ? success
                  : status === "PAYMENT"
                  ? warning
                  : status === "DEPOSIT" || status === "GOING_TO_WORK"
                  ? info
                  : ""
              }
            >
              {status === "USER_ACCEPTED"
                ? "سفارش جدید"
                : status === "STARTED"
                ? "درحال انجام"
                : status === "GOING_TO_WORK"
                ? "رفتن به محل کار"
                : status === "PAYMENT"
                ? "در انتظار پرداخت"
                : status === "DEPOSIT"
                ? "پرداخت بیعانه"
                : status === "EXPERT_ACCEPTED"
                ? "سفارش جدید"
                : status === "DEPOSIT_PAID"
                ? "در حال انجام"
                : ""}
            </span>
          </div>
        </div>
        <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />
        <div className="flex flex-col justify-center items-end gap-3 self-stretch">
          <div className="flex flex-row-reverse flex-end items-center gap-2">
            <div className="relative w-[24px] h-[24px] p-[3px_4.5px]">
              <Image src={Location} alt="location" fill />
            </div>
            <span className="text-[#333334] text-[10px] 2xs:text-[14px] font-[400] leading-[140%] text-right">
              {fullAddress}
            </span>
          </div>
          <div className="flex flex-row-reverse flex-end items-center gap-2">
            <div className="relative w-[24px] h-[24px] p-[2.75px]">
              <Image src={Clock} alt="clock" fill />
            </div>
            <span className="text-[#333334] text-[10px] 2xs:text-[14px] font-[400] leading-[140%] text-right">
              {data?.order_date === null
                ? ""
                : convertToJalaliDate(data?.order_date) +
                  " ساعت " +
                  time +
                  " " +
                  (timeData > 3 && timeData < 12
                    ? "صبح"
                    : timeData >= 12 && timeData < 14
                    ? "ظهر"
                    : timeData >= 14 && timeData < 17
                    ? "بعد از ظهر"
                    : timeData >= 17 && timeData < 20
                    ? "غروب"
                    : "شب")}
            </span>
          </div>
        </div>
        {status !== "USER_ACCEPTED" && (
          <>
            <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />
            <User data={data} />
          </>
        )}
        <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />
        {status !== "PAYMENT" && (
          <>
            <GeneralInformation data={data} />
            <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />
          </>
        )}
        {status === "PAYMENT" && (
          <>
            <div
              dir="rtl"
              className="w-full flex gap-2 items-center justify-center text-[14px] font-[600] leading-[140%] text-[#333334]"
            >
              <span>مبلغ کل قابل دریافت: </span>
              <span>{totalCost} تومان</span>
            </div>
            <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />
          </>
        )}
        <div className="w-full flex flex-row-reverse justify-between items-center gap-[10px]">
          <Details id={data.id} expert={true} />
          {status === "DEPOSIT" || status === "STARTED" ? (
            <Invoice data={data} />
          ) : status === "GOING_TO_WORK" ? (
            <GoingToWork
              id={data?.id}
              allData={allData}
              setAllData={setAllData}
            />
          ) : status === "USER_ACCEPTED" ? (
            <Accepted id={data?.id} allData={allData} setAllData={setAllData} />
          ) : status === "EXPERT_ACCEPTED" ? (
            <Started id={data?.id} allData={allData} setAllData={setAllData} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export { ExpertOrderCard };
