import { useState } from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import OnlinePayment from "../onlinePayment/OnlinePayment";
import CashPayment from "../cashPayment/CashPayment";
import DepositOnlinePay from "../depositOnlinePay/DepositOnlinePay";

const DepositPayment = ({ data }) => {
  const [isOnlinePayment, setIsOnlinePayment] = useState(true);

  const offer = 0;
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
            <li>هزینه کل توافق شده:</li>
            <li>مبلغ درخواستی بیعانه:</li>
          </ul>
          <ul className="flex flex-col gap-2 m-0 p-0 list-none text-right text-zinc-800 text-sm font-semibold leading-tight">
            <li>{data?.deposit?.initial_agreed_amount} تومان</li>
            <li>{data?.deposit?.deposit} تومان</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-right text-zinc-800 text-sm font-semibold leading-tight">
            بابت:
          </span>
          <li className="mr-3 text-right text-zinc-800 text-sm font-normal leading-tight">
            {data?.deposit?.deposit_description}
          </li>
        </div>
        <span className="[border:1px_solid_#EFEFEF] w-full block rounded-[1px]" />
        <div className="w-full flex gap-4 text-right text-zinc-800 text-sm font-semibold font-['IRANYekanXFaNum'] leading-tight">
          <span>مبلغ قابل پرداخت:</span>
          <span>
            {data?.deposit?.deposit}
            تومان
          </span>
        </div>
      </div>
      <div className="w-full md:w-[748px] flex flex-col justify-center items-start gap-4 rounded-[8px] [border:1px_solid_#d9d9d9] bg-white [box-shadow:0px_0px_8px_0px_rgba(97,100,117,0.20)] p-4">
        <div className="w-full flex justify-center gap-2">
          <Button className="w-[329px] h-[38px] px-4 py-2 hover:bg-indigo-200 bg-indigo-200 rounded text-blue-600 font-['IRANYekanXFaNum'] text-base font-semibold leading-snug">
            پرداخت انلاین
          </Button>
        </div>
        <div className="w-full">
          <div className={`w-full transition-all duration-700`}>
            <DepositOnlinePay invoice={data?.deposit?.deposit} id={data?.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositPayment;
