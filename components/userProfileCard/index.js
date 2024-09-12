import React from "react";
import Image from "next/image";
import Link from "next/link";
import serviceExpert from "../../public/icons/serviceExpert.svg";
import { Button, Rating } from "@mui/material";
import { usePostOrderSelectedExpert } from "../../core/hooks/useOrderApi";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const UserProfileCard = ({
  id,
  name,
  specialty,
  is_guaranteed,
  favorite = false,
  avatar,
  rate,
  commentCount,
}) => {
  const router = useRouter();
  const mutation = usePostOrderSelectedExpert();
  const orderId = localStorage.getItem("order_id");

  const handleSelectExpert = async () => {
    const stringId = id.toString();
    await mutation.mutateAsync(
      { order_id: orderId, expert_id: stringId },
      {
        onSuccess: () => {
          toast.success("متخصص با موفقیت تغییر یافت");
        },
      }
    );

    router.push("/order");
  };
  return (
    <div className="w-full lg:w-[371px] flex flex-col items-center relative  cursor-pointer hover:scale-105 transition-all	duration-500">
      <div className="flex border-[#EBEBEB] border-2 border-solid rounded-xl w-full p-1 items-center ">
        <div className="basis-1/3">
          <Image
            className=" rounded-lg m-4"
            src={avatar == null ? serviceExpert : avatar}
            alt="expert profile card"
            width={104}
            height={120}
          />
        </div>
        <div className="flex-col  justify-between">
          <div>
            <p className="text-gray-900 font-[700] text-base mb-2">{name}</p>
            <p className="text-gray-400 text-xs mb-2">{specialty}</p>
          </div>
          {is_guaranteed && (
            <div className="absolute top-4 left-3">
              <img alt="icon" src="/icons/garanty.svg" className="bred]" />
            </div>
          )}{" "}
          {is_guaranteed && (
            <div className="text-[14px] mt-4 mb-0 text-primary font-bold ">
              گارانتی می کند
            </div>
          )}
          <div className="flex flex-col text-[12px] mt-5 ">
            {!!rate && (
              <div className="flex gap-1 items-center">
                <Rating
                  name="read-only"
                  value={rate}
                  max={rate}
                  dir="ltr"
                  readOnly
                />
                <p className="text-gray-700 text-xs font-[500] m-0">
                  ({commentCount} نظر)
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className="flex w-11/12 rounded-xl relative bottom-3 z-30 bg-white shadow-[0px_0px_4px_3px_#0361FF1A]
"
      >
        <Button
          href={`/experts/${id}`}
          className="flex-1 text-black text-xs  font-bold py-3"
        >
          مشاهده پروفایل
        </Button>
        <Button
          onClick={handleSelectExpert}
          className="flex-1 bg-primary font-bold text-xs text-white py-3 rounded-l-xl"
        >
          انتخاب متخصص
        </Button>
      </div>
    </div>
  );
};

export default UserProfileCard;
