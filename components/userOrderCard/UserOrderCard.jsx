import Image from "next/image";
import { useState } from "react";
import Location from "../../public/icons/location2.svg";
import Clock from "../../public/icons/clock2.svg";
import infoPic from "../../public/icons/info.svg";
import { Expert } from "../orderCards/OrderCards.jsx";
import { PaymentPart } from "../orderCards/OrderCards.jsx";
import { Details } from "../orderCards/OrderCards.jsx";
import { CompleteOrder } from "../orderCards/OrderCards.jsx";
import { Pay } from "../orderCards/OrderCards.jsx";
import { TryAgain } from "../orderCards/OrderCards.jsx";
import { format } from "date-fns-jalali";
import { faIR } from "date-fns-jalali/locale";
import { CloseRounded } from "@mui/icons-material";
import { Button, Modal } from "@mui/material";
import { useRouter } from "next/router.js";
import ChangeExpertButton from "../changeExpert/ChangeExpertButton.js";

const UserOrderCard = ({ status, Key, data, handleClick }) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const neighborhood = data?.user_address?.neighborhood ?? "";

  const details = data?.user_address?.details ?? "";
  const title = data?.user_address?.title ?? "";
  const fullAddress = neighborhood + " " + details + " " + title;

  const timeData =
    data?.order_time === null ? "" : data?.order_time.split("-")[0];
  const time = timeData > 12 ? timeData - 12 : timeData;

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

  const handleChangeExpert = () => {
    localStorage.setItem("orderId", data?.id);

    const navigateRoute = `/services/select-expert?type=change`;
    router.push(navigateRoute);
  };

  return (
    <>
      <div
        key={Key}
        className="w-full md:w-[48%] xl:w-[397px] p-4 flex flex-col justify-center items-start gap-4 shrink-0 rounded-[8px] [border:1px_solid_#d9d9d9] [box-shadow:0px_0px_8px_0px_rgba(97,100,117,0.20)]"
      >
        <div className="flex justify-end items-center gap-4 self-stretch">
          <div className="w-auto 2xs:w-[244px] flex flex-col gap-[6px] shrink-0">
            <b className="text-[12px] 2xs:text-[16px] text-right font-[600] leading-[160%] text-[#212121]">
              {data?.service.category.title}
            </b>
            <span className="text-[#6F767E] text-[10px] 2xs:text-[14px] font-[400] leading-[140%] text-right">
              کد پیگیری: {data?.order_track_id}
            </span>
          </div>
          <div className="w-[50px] h-[50px] rounded-[4px] [border:1px_solid_#d6d6d6] flex justify-center items-center p-[3px] bg-white relative">
            <Image
              src={data?.service.category.category_image}
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
          <div
            onClick={() => {
              if (status === "DEPOSIT") {
                setShowModal(true);
              }
            }}
            className="flex flex-row-reverse gap-2"
          >
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
                status === "EXPERT_ACCEPTED" ||
                status === "STARTED" ||
                status === "DEPOSIT_PAID" ||
                status === "GOING_TO_WORK"
                  ? success
                  : status === "CANCELED" || status === "REJECTED"
                  ? danger
                  : status === "USER_ACCEPTED" || status === "PAYMENT"
                  ? warning
                  : status === "DEPOSIT"
                  ? info
                  : status === "PENDING" || status === "FINISHED"
                  ? draft
                  : ""
              }
            >
              {status === "EXPERT_ACCEPTED"
                ? "تایید شده"
                : status === "USER_ACCEPTED"
                ? "در انتظار قبول سرویس"
                : status === "STARTED"
                ? "درحال انجام"
                : status === "PENDING"
                ? "پیش نویس"
                : status === "PAYMENT"
                ? "در انتظار پرداخت"
                : status === "DEPOSIT"
                ? "پرداخت بیعانه"
                : status === "CANCELED"
                ? "لغو شده"
                : status === "FINISHED"
                ? "پایان یافته"
                : status === "DEPOSIT_PAID"
                ? "در حال انجام"
                : status === "GOING_TO_WORK"
                ? "اعزام متخصص"
                : status === "REJECTED"
                ? "لغو شده توسط متخصص"
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
        <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />

        {status === "EXPERT_ACCEPTED" ||
        status === "STARTED" ||
        status === "DEPOSIT" ||
        status === "DEPOSIT_PAID" ||
        status === "GOING_TO_WORK" ||
        status === "REJECTED" ||
        status === "FINISHED" ? (
          <>
            <Expert data={data} />

            <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />
          </>
        ) : status === "PAYMENT" ? (
          <>
            <PaymentPart data={data} />
            <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />
          </>
        ) : (
          <>
            <div className="w-full h-[50px] hidden md:flex flex-row-reverse justify-end items-center gap-[10px]"></div>
            <span className="[border:1px_solid_#EFEFEF] w-full hidden md:block rounded-[1px]" />
          </>
        )}
        <div className="w-full flex flex-row-reverse justify-between items-center gap-[10px]">
          {status === "EXPERT_ACCEPTED" ||
          status === "USER_ACCEPTED" ||
          status === "STARTED" ||
          status === "DEPOSIT_PAID" ||
          status === "FINISHED" ? (
            <Details id={data.id} />
          ) : status === "GOING_TO_WORK" ? (
            <Details id={data?.id} />
          ) : status === "PENDING" ? (
            <>
              <Details id={data.id} />
              <CompleteOrder />
            </>
          ) : status === "DEPOSIT" || status === "PAYMENT" ? (
            <>
              <Details id={data.id} />
              <Pay id={data.id} status={status} />
            </>
          ) : status === "CANCELED" ? (
            <>
              <Details id={data.id} />
              <TryAgain />
            </>
          ) : status === "REJECTED" ? (
            <>
              <Details id={data?.id} />
              <ChangeExpertButton />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <HelpDeposit isOpen={showModal} setIsOpen={setShowModal} />
    </>
  );
};

const HelpDeposit = ({ isOpen, setIsOpen }) => {
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Modal
      open={isOpen}
      onClose={setIsOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="w-[95%] 2xs:w-[343px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  rounded-lg flex flex-col p-5 bg-white gap-[10px] ">
        <div
          className="w-[25px] h-[25px] 2xs:w-[32px] 2xs:h-[32px] p-[2px] 2xs:p-1 flex justify-center items-center bg-[#EFEFEF] rounded-full absolute top-4 right-4 cursor-pointer hover:bg-[#d6d6d6]"
          onClick={handleClick}
        >
          <CloseRounded className="text-[#33383F] w-full h-full" />
        </div>
        <h3 className="text-[14px] 2xs:text-[18px] font-[600] leading-[140%] text-center text-[#0361FF]">
          راهنمای پرداخت بیعانه
        </h3>
        <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />
        <p className="text-justify text-[#535763] text-[10px] 2xs:text-[14px] leading-[150%] font-[400]">
          مشتری گرامی ممکن است سرویس درخواستی شما برای انجام نیاز به پرداخت
          بیعانه داشته باشد. در اینصورت شما میتوانید مبلغی را بعنوان بیعانه به
          حساب امن واریز نمایید . درصورتی که متخصص به هر دلیلی در انجام سرویس
          کوتاهی نماید، این مبلغ به حساب شما بازخواهد گشت.
        </p>
      </div>
    </Modal>
  );
};

export { UserOrderCard };
