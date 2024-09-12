import React from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import {Comments} from "../comments/Comments";
import WorkSamplesS from "../../components/experts/wrok-samples";

import {
  LocationOnOutlined,
  CheckCircleOutlineOutlined,
  StarRounded,
} from "@mui/icons-material";

const ExpertProfilePage = () => {
  const experts = [
    {
      id: "1",
      name: "جواد نقی زاده",
      specialty: "کلیدسازی",
      avatar: "/images/expert1.jpg",
    },
    {
      id: "2",
      name: "هادی باقری مقدم نکاح",
      specialty: "مکانیک و آپاراتی و پنچرگیری سیار",
      avatar: "/images/expert2.jpg",
    },
    {
      id: "3",
      name: "سیدحسین رضائی طلب یزدی",
      specialty: "مکانیک سیار",
      avatar: "/images/expert3.jpg",
    },
  ];
  const buttonVariants = {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 0 },
  };
  const router = useRouter();
  const { id } = router.query;

  // Find expert by id
  const foundExpert = experts.find((expert) => expert.id == id);

  if (!foundExpert) {
    return <p className="text-red-500">Expert not found</p>;
  }

  const { name, specialty, avatar } = foundExpert;

  return (
    <div className="w-full ">
      <div className="mt-[5rem] max-w-md mx-auto md:max-w-[740px] flex-col justify-center items-center  md:mt-[-2rem] p-4">
        <h3>پروفایل متخصص:</h3>
        <div className="max-w-md md:max-w-[740px] mx-auto text-center items-center  my-8 p-6 bg-white rounded-md shadow-md">
          <img
            src="/images/expert.jpg"
            alt={`Avatar of ${name}`}
            className="w-[104px] rounded-md h-[120px] mx-auto  object-cover mb-4"
          />
          <p className="text-gray-600">{specialty}</p>
          <h3 className="text-2xl font-semibold mb-2">{name}</h3>
          <div className="text-primary flex items-center gap-3 mx-auto font-bold justify-center">
            گارانتی می کند
            <img alt="icon" src="/icons/garanty.svg" className="bred]" />
          </div>
          <div className="flex mt-3 justify-center gap-4 items-center">
            <div className="flex items-center ml-2">
              <LocationOnOutlined className="text-primary" />
              <span className="text-[12px] md:text-[14px]">بوشهر</span>
            </div>
            <div className="flex gap-1 items-center ml-2">
              <CheckCircleOutlineOutlined className="text-primary" />
              <span className="text-[12px] md:text-[14px]">
                دارای عدم سو پیشینه
              </span>
            </div>
            <div className="flex gap-1 items-center ml-2">
              <CheckCircleOutlineOutlined className="text-primary" />
              <span className="text-[12px] md:text-[14px]">گواهی مهارت</span>
            </div>
          </div>
          <div className="my-4 flex gap-1 justify-center items-center">
            <div className="w-[109px] md:w-[196px] !bg-[#F9F9F9] rounded-[16px] mx4 p-3 h-[73px]  ">
              <div className="text-[10px] mb-2 whitespace-nowrap md:text-[12px] text-[#616161]">
                سرویس های موفق
              </div>
              <div className="inline-block font-bold text-[12px] md:text-[14px] mt-2">
                12 سرویس
              </div>
            </div>
            <div className="w-[109px] md:w-[196px] !bg-[#F9F9F9] rounded-lg p-3 h-[73px]  ">
              <span className="text-[10px] md:text-[12px] text-[#616161]">
                نظرات کاربران
              </span>
              <div className="flex items-center md:w-full justify-center mt-2 gap-3">
                <div className="text-[12px] whitespace-nowrap md:text-[14px] font-bold ">
                  12 نظر
                </div>
                <div className="flex items-center">
                  <StarRounded className="text-[#FB9400] -mt-1" />
                  1.0
                </div>
              </div>
            </div>
            <div className="w-[109px] md:w-[196px]  !bg-[#F9F9F9] rounded-lg  p-3 h-[73px]  ">
              <span className="text-[10px] md:text-[12px] text-[#616161]">
                تاریخ عضویت
              </span>
              <div className="font-bold text-[12px] md:text-[14px] mt-2">
                1403
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mx-auto">
          <WorkSamplesS />
        </div>
        <Comments />
      </div>
      <div
        style={{
          boxShadow: "0px -5px 10.300000190734863px 0px #6164751A",
        }}
        className="flex z-20 px-2 md:px-[26rem]  bg-[white] fixed gap-6 md:py-6 pb-10 w-full md:gap-[20%] shadow  justify-center text-center bottom-0  left-0 right-0  p-4"
      >
        <motion.button
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full whitespace-nowrap block md:w-min md:px-16  py-3 rounded-xl border-0 bg-primary text-white "
          onClick={() => {
            window.history.back();
          }}
        >
          بازگشت
        </motion.button>
      </div>
    </div>
  );
};

export default ExpertProfilePage;
