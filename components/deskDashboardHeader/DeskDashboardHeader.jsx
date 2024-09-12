import React, { useContext } from "react";
import Image from "next/image";
import { UserContext } from "../../pages/_app";
import ProfileIconSvg from "../../public/icons/expertProfileDefaultIcon.svg";
import DeskSkill from "../../public/icons/deskSkill.svg";
import DeskCheckmark from "../../public/icons/deskCheckmark.svg";
import RepresentGuarantee from "../../public/icons/representGuarantee.svg";

const DeskDashboardHeader = ({ initialValues, setClickSideBar }) => {
  return (
    <div className="bg-white rounded-xl [border:1px_solid_#EBEBEB] md:bg-transparent md:border-none w-full md:h-[140px] flex flex-col md:flex-row items-center justify-center p-2 gap-2 md:p-0 md:gap-2 lg:gap-4">
      <div className="md:bg-white md:[border:1px_solid_#EBEBEB] h-[140px] md:h-full md:w-[30%] w-full md:rounded-xl flex gap-1 md:p-1 items-center justify-center">
        <div className="w-[50%] h-full flex items-center justify-center">
          <div className="w-[110px] h-[110px] relative rounded-[50%]">
            <Image
              className="object-fill rounded-[50%]"
              src={
                initialValues?.avatar
                  ? initialValues?.avatar
                  : ProfileIconSvg.src
              }
              quality={100}
              fill
              alt="icon"
            />
          </div>
        </div>
        <div className="w-[50%] h-full flex flex-col items-center justify-center">
          {/* <p className="m-0 p-0 text-[#999BA7] text-[13px] 3xs:text-[14px] 2xs:text-[15px] sm:text-[17px] md:text-[12px] lg:text-[13px]">
            {initialValues?.category.title && initialValues?.category.title}
          </p> */}
          <p className="mt-2 mb-0 text-[#1A1D1F] text-[14px] 3xs:text-[15px] 2xs:text-[16px] sm:text-[18px] md:text-[16px] font-bold">
            {initialValues?.name || "کاربر جدید"}
          </p>
          <p className="mb-2 mt-0 text-[#999BA7] text-[14px] 3xs:text-[15px] 2xs:text-[16px] sm:text-[18px] md:text-[16px]">
            {initialValues?.user.username && `0${initialValues?.user.username}`}
          </p>
        </div>
      </div>
      <div className="md:bg-white md:[border:1px_solid_#EBEBEB] h-[130px] 3xs:h-[82px] md:h-full md:w-[30%] w-full md:rounded-xl grid 3xs:grid-cols-3 grid-cols-2 gap-2 px-2 md:py-6 md:px-[2px] lg:px-2 md:gap-1 items-center justify-center">
        <div className="w-full h-full rounded-xl">
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 3xs:py-3">
            <div className="w-full h-full relative">
              <Image
                className={`object-contain ${
                  initialValues.skill_certificate ? "" : "grayscale-[100%]"
                }`}
                src={DeskSkill.src}
                quality={100}
                fill
                alt="icon"
              />
            </div>
            <div className="text-[11px] text-[#333334] xs:text-[10px] lg:text-[12px] text-center">
              گواهی مهارت
            </div>
          </div>
        </div>
        <div className="w-full h-full rounded-xl">
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 3xs:py-3">
            <div className="w-full h-full relative">
              <Image
                className={`object-contain ${
                  initialValues.clearance ? "" : "grayscale-[100%]"
                }`}
                src={DeskSkill.src}
                quality={100}
                fill
                alt="icon"
              />
            </div>
            <div className="text-[11px] text-[#333334] xs:text-[10px] lg:text-[12px] text-center">
              عدم سو پیشینه
            </div>
          </div>
        </div>
        <div className="w-full h-full rounded-xl">
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 3xs:py-3">
            <div className="w-full h-full relative">
              <Image
                className={`object-contain ${
                  initialValues.is_guaranteed ? "" : "grayscale-[100%]"
                }`}
                src={RepresentGuarantee.src}
                quality={100}
                fill
                alt="icon"
              />
            </div>
            <div className="text-[11px] text-[#333334] xs:text-[10px] lg:text-[12px] text-center">
              ارائه گارانتی
            </div>
          </div>
        </div>
      </div>
      <div className="md:bg-white h-[110px] 3xs:h-[73px] md:[border:1px_solid_#EBEBEB] md:h-full md:w-[40%] w-full md:rounded-xl grid 3xs:grid-cols-3 grid-cols-2 gap-2 px-2 md:py-6 md:px-4 md:gap-3 items-center justify-center">
        <div className="bg-[#F9F9F9] [border:1px_solid_#EBEBEB] h-full rounded-xl flex flex-col items-center justify-center gap-1 lg:gap-3 px-1">
          <div className="text-[10px] text-[#616161] xs:text-[12px] text-center">
            سرویس های موفق
          </div>
          <div className="text-[12px] text-[#212121] xs:text-[14px] text-center font-semibold">
            {initialValues?.complete_orders
              ? initialValues?.complete_orders
              : "0"}{" "}
            سرویس
          </div>
        </div>
        <div
          onClick={() => setClickSideBar("comments")}
          className="bg-[#F9F9F9] [border:1px_solid_#EBEBEB] cursor-pointer h-full rounded-xl flex flex-col items-center justify-center gap-1 lg:gap-3 px-1"
        >
          <div className="text-[10px] text-[#616161] xs:text-[12px] text-center">
            نظرات کاربران
          </div>
          <div className="text-[12px] text-[#212121] xs:text-[14px] text-center font-semibold">
            {initialValues?.comments_number
              ? initialValues?.comments_number
              : "0"}{" "}
            نظر
          </div>
        </div>
        <div className="bg-[#F9F9F9] [border:1px_solid_#EBEBEB] h-full rounded-xl flex flex-col items-center justify-center gap-1 lg:gap-3 px-1">
          <div className="text-[10px] text-[#616161] xs:text-[12px] text-center">
            میزان درآمد (تومان)
          </div>
          <div className="text-[12px] text-[#0AD253] xs:text-[11px] lg:text-[14px] text-center font-semibold">
            {initialValues?.income ? initialValues?.income : "0"}
          </div>
        </div>
      </div>
    </div>
  );
};

export { DeskDashboardHeader };
