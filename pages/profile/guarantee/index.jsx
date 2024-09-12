import React from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@mui/material/Button";
import BackButton from "../../../components/backButton";
import useWindowWidth from "../../../core/utils/useWindowWidth";
import { useGetGuaranteedOrders } from "../../../core/hooks/useOrderApi";
import { getTimeRemaining } from "../../../core/utils/formatNumbersWithCommas";

const data = [
  {
    title: "تعمیر یخچال",
    subtitle: "سفارش شماره 53783 ",
    timeout: "15 روز باقی مانده",
    icon: "/icons/refrigerator.svg",
    done: false,
  },
  {
    title: "تعمیر کولر",
    subtitle: "سفارش شماره 53783 ",
    timeout: "به پایان رسید",
    icon: "/icons/cooler.svg",
    done: true,
  },
  {
    title: "تعمیر یخچال",
    subtitle: "سفارش شماره 53783 ",
    timeout: "20 روز دیگر باقی مانده ",
    icon: "/icons/refrigerator.svg",
    done: false,
  },
];

export default function Guarantee() {
  const windowWidth = useWindowWidth();
  const { data: orders, isLoading } = useGetGuaranteedOrders();
  console.log("datata", orders);

  return (
    <>
      {windowWidth > 768 ? null : <BackButton title="گارانتی" />}
      <div className="flex flex-col pb-3 pt-6 px-2 md:m-0 md:mt-4 mx-auto bg-white rounded-xl w-[95%]">
        <div className="flex flex-wrap  justify-center items-center ml-4">
          <div className="basis-[100%] lg:basis-[55%] h-[8rem]">
            <div className="m-2 w-full rounded-xl border-[#EBEBEB] border-2 border-solid flex items-center justify-center p-1 cursor-pointer ">
              <Image
                src="/icons/guarantee-icon.svg"
                alt="crown icon"
                width={99}
                height={99}
              />
              <div className="flex flex-col justify-center items-center">
                <p className="text-sm text-[#1A1D1F] mx-4">
                  خدمات انجام شده توسط حرفه ای{" "}
                </p>
                <p className="font-[700] text-[1.125rem] text-[#0361FF]">
                  گارانتی دارند!
                </p>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-xs font-normal">
          خدمات دارای گارنتی را می توانید در لیست زیر مشاهده کنید در صورت هر
          گونه مشکل با پشتیبانی در تماس باشید.
        </h1>
        <>
          <h1 className="text-base font-normal">جزئیات گارانتی ها</h1>

          {orders?.data?.results?.map((item, i) => (
            <Link
              href={`/order/order-details/${item.id}/`}
              key={i}
              className="h-[4rem] m-2 rounded-xl border-[#EBEBEB] border-2 border-solid flex  justify-between items-center p-1 cursor-pointer "
            >
              <div className="flex items-center">
                <Image
                  className=" mx-2 my-0"
                  src={item?.service?.category?.category_image}
                  alt="service image"
                  width={32}
                  height={32}
                />
                <div className="flex flex-wrap">
                  <h1 className="md:text-base text-xs font-normal my-0 ">
                    {item?.service?.category?.title}
                  </h1>
                  <p className="text-xs text-[#0361FF] flex gap-1 mr-2 my-1">
                    <span>شماره سفارش</span>
                    <span>{item?.order_track_id}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center ">
                <p
                  className="text-[10px] text-center font-[600] text-[#1EDF0D]"
                  style={item?.done ? { color: "#999BA7" } : {}}
                >
                  {getTimeRemaining(item?.guaranteed_until)}
                </p>
                <Image
                  className="m-4"
                  src={
                    item?.done
                      ? "/icons/guarantee-expired.svg"
                      : "/icons/guarantee-active.svg"
                  }
                  alt="guarantee image"
                  width={22}
                  height={22}
                />
              </div>
            </Link>
          ))}

          {orders?.data?.results?.length === 0 && (
            <p className="font-semibold text-center">
              سرویسی براش شما گارانتی نشده است
            </p>
          )}
        </>
      </div>
    </>
  );
}
