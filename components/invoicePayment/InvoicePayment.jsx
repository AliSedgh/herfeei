import { useState } from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import OnlinePayment from "../onlinePayment/OnlinePayment";
import CashPayment from "../cashPayment/CashPayment";

const InvoicePayment = ({ data }) => {
  const [isOnlinePayment, setIsOnlinePayment] = useState(true);
  console.log("***********", data);

  return (
    <div className="w-full flex justify-center items-center flex-col gap-4">
      <div className="w-full md:w-[748px] flex p-4 flex-col justify-center items-start gap-4 rounded-[8px] [border:1px_solid_#d9d9d9] bg-white [box-shadow:0px_0px_8px_0px_rgba(97,100,117,0.20)]">
        <div className="flex flex-row-reverse justify-end items-center gap-4 self-stretch">
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
        <div className="flex gap-4">
          <ul className="flex flex-col gap-2 m-0 p-0 list-none text-right text-zinc-800 text-sm font-normal leading-tight">
            {data?.invoice?.expertise === 0 ? (
              <li>هزینه سرویس:</li>
            ) : (
              <li>هزینه کارشناسی:</li>
            )}
            <li>هزینه ایاب و ذهاب:</li>
            <li>مجموع هزینه ها:</li>
            {data?.deposit?.deposit_paid && data?.deposit?.deposit && (
              <li>مبلغ بیعانه پرداختی:</li>
            )}
            {data?.used_discount && data?.invoice?.discount_amount && (
              <li>تخفیف:</li>
            )}
          </ul>
          <ul className="flex flex-col gap-2 m-0 p-0 list-none text-right text-zinc-800 text-sm font-semibold leading-tight">
            {data?.invoice?.expertise === 0 ? (
              <li>{data?.invoice?.service_cost} تومان</li>
            ) : (
              <li>{data?.invoice?.expertise} تومان</li>
            )}
            <li>{data?.invoice?.transportation_cost} تومان</li>
            <li>
              {data?.invoice?.service_cost +
                data?.invoice?.transportation_cost +
                data?.invoice?.expertise}{" "}
              تومان
            </li>
            {data?.deposit?.deposit_paid && data?.deposit?.deposit && (
              <li>{data?.deposit?.deposit} تومان</li>
            )}
            {data?.used_discount && data?.invoice?.discount_amount && (
              <li>{data?.invoice?.discount_amount} تومان</li>
            )}
          </ul>
        </div>
        <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />
        <div className="w-full flex gap-4 text-right text-zinc-800 text-sm font-semibold font-['IRANYekanXFaNum'] leading-tight">
          <span>جمع کل صورتحساب:</span>
          <span>
            {data?.invoice?.service_cost +
              data?.invoice?.transportation_cost +
              data?.invoice?.expertise -
              (data?.deposit?.deposit_paid ? data?.deposit?.deposit : 0)}
            تومان
          </span>
        </div>
      </div>
      <div className="w-full md:w-[748px] flex flex-col justify-center items-start gap-4 rounded-[8px] [border:1px_solid_#d9d9d9] bg-white [box-shadow:0px_0px_8px_0px_rgba(97,100,117,0.20)] p-4">
        <div className="w-full flex justify-center gap-2">
          <Button
            onClick={() => setIsOnlinePayment(true)}
            className={`${
              isOnlinePayment
                ? "w-[161px] h-[38px] px-4 py-2 hover:bg-indigo-200 bg-indigo-200 rounded text-blue-600 text-base font-semibold font-['IRANYekanXFaNum'] leading-snug"
                : "w-[161px] h-[38px] px-4 py-2 rounded text-neutral-400 text-base font-semibold leading-snug"
            }`}
          >
            پرداخت انلاین
          </Button>
          <Button
            onClick={() => setIsOnlinePayment(false)}
            className={`${
              isOnlinePayment
                ? "w-[161px] h-[38px] px-4 py-2 rounded text-neutral-400 text-base font-semibold leading-snug"
                : "w-[161px] h-[38px] px-4 py-2 hover:bg-indigo-200 bg-indigo-200 rounded text-blue-600 text-base font-semibold leading-snug"
            }`}
          >
            پرداخت نقدی
          </Button>
        </div>
        <div className="w-full overflow-hidden">
          <div
            className={`${
              isOnlinePayment ? "translate-x-0" : "translate-x-[50%]"
            } w-[200%] transform transition-all duration-700 flex items-center`}
          >
            <div
              className={`${
                isOnlinePayment ? "opacity-100" : "opacity-0 invisible"
              } w-1/2 transition-all duration-700`}
            >
              <OnlinePayment
                invoice={
                  data?.invoice?.service_cost +
                  data?.invoice?.expertise +
                  data?.invoice?.transportation_cost -
                  (data?.deposit?.deposit_paid ? data?.deposit?.deposit : 0)
                }
                id={data?.id}
                usedDiscount={data?.used_discount}
              />
            </div>
            <div
              className={`${
                isOnlinePayment ? "opacity-0 invisible" : "opacity-100"
              } w-1/2 transition-all duration-700`}
            >
              <CashPayment
                invoice={
                  data?.invoice?.service_cost +
                  data?.invoice?.expertise +
                  data?.invoice?.transportation_cost -
                  (data?.deposit?.deposit_paid ? data?.deposit?.deposit : 0)
                }
                id={data?.id}
                usedDiscount={data?.used_discount}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePayment;
