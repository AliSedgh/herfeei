import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Comments } from "../../components/comments/Comments";
import WorkSamplesS from "../../components/experts/wrok-samples";
import { getYear } from "date-fns-jalali";

import {
  LocationOnOutlined,
  CheckCircleOutlineOutlined,
  StarRounded,
} from "@mui/icons-material";
import {
  useGetExpertDetail,
  useGetExpertSampleList,
} from "../../core/hooks/useExpertApi";
import { Button } from "@mui/material";
import { usePostOrderSelectedExpert } from "../../core/hooks/useOrderApi";

const ExpertProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [expertDetailInitial, setExpertDetailInitial] = useState();
  const [expertSampleListInitial, setExpertSampleListInitial] = useState();
  const mutation = usePostOrderSelectedExpert();
  const orderId = localStorage.getItem("order_id");

  const handleSelectExpert = async () => {
    const stringId = id.toString();
    await mutation.mutateAsync({ order_id: orderId, expert_id: stringId });
    router.push("/order");
  };

  const { data: expertSampleList, isLoading: expertSampleListIsLoading } =
    useGetExpertSampleList(id);
  const { data: expertDetail, isLoading: expertDetailIsLoading } =
    useGetExpertDetail(id);

  useEffect(() => {
    if (expertDetail && !expertDetailIsLoading) {
      setExpertDetailInitial(expertDetail);
    }
    if (expertSampleList && !expertSampleListIsLoading) {
      setExpertSampleListInitial(expertSampleList);
    }
  }, [expertDetail, expertSampleList]);

  function formattedDate(date) {
    const year = expertDetailInitial && getYear(new Date(date));
    return year;
  }

  const buttonVariants = {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 0 },
  };

  // Find expert by id

  return (
    <div className="w-full min-h-[100vh] mb-[100px] mt-[10px]">
      <div className="max-w-md mx-auto md:max-w-[740px] flex-col justify-center items-center p-4">
        <h3>پروفایل متخصص:</h3>
        <div className="max-w-md md:max-w-[740px] mx-auto text-center items-center  my-8 p-6 bg-white rounded-md shadow-md">
          <img
            src={expertDetailInitial?.avatar}
            alt={`Avatar of ${expertDetailInitial?.name}`}
            className="w-[104px] rounded-md h-[120px] mx-auto object-cover mb-4"
          />
          {/* <p className="text-gray-600">
            {expertDetailInitial?.category?.title}
          </p> */}
          <h1 className="text-2xl font-semibold mb-2">
            {expertDetailInitial?.name}
          </h1>
          <div
            className={`text-primary flex items-center gap-3 mx-auto font-bold justify-center ${
              expertDetailInitial?.is_guaranteed ? "" : "grayscale-[100%]"
            }`}
          >
            گارانتی می کند
            <img alt="icon" src="/icons/garanty.svg" className="bred]" />
          </div>
          <div className="flex mt-3 justify-center gap-4 items-center">
            <div className="flex items-center ml-2">
              <LocationOnOutlined className="text-primary" />
              <span className="text-[12px] md:text-[14px]">
                {expertDetailInitial?.city?.name}
              </span>
            </div>
            <div className="flex gap-1 items-center ml-2">
              <CheckCircleOutlineOutlined
                className={`text-primary ${
                  expertDetailInitial?.clearance ? "" : "grayscale-[100%]"
                }`}
              />
              <span className="text-[12px] md:text-[14px]">
                دارای عدم سو پیشینه
              </span>
            </div>
            <div className="flex gap-1 items-center ml-2">
              <CheckCircleOutlineOutlined
                className={`text-primary ${
                  expertDetailInitial?.skill_certificate
                    ? ""
                    : "grayscale-[100%]"
                }`}
              />
              <span className="text-[12px] md:text-[14px]">گواهی مهارت</span>
            </div>
          </div>
          <div className="my-8 flex gap-1 justify-center items-center">
            <div className="w-[109px]  md:w-[196px]   !bg-[#F9F9F9] rounded-[16px] mx4 p-3 h-[73px]  ">
              <div className="text-[10px] mb-2 whitespace-nowrap md:text-[12px] text-[#616161]">
                سرویس های موفق
              </div>
              <div className="inline-block font-bold text-[12px] md:text-[14px] mt-2">
                {expertDetailInitial?.completed_orders
                  ? expertDetailInitial?.completed_orders
                  : "0"}{" "}
                سرویس
              </div>
            </div>
            <div className="w-[109px] md:w-[196px] !bg-[#F9F9F9] rounded-lg  p-3 h-[73px]  ">
              <span className="text-[10px] md:text-[12px] text-[#616161]">
                نظرات کاربران
              </span>
              <div className="flex items-center md:w-full justify-center mt-2 gap-3">
                <div className="text-[12px] whitespace-nowrap md:text-[14px] font-bold ">
                  {expertDetailInitial?.comments_number
                    ? expertDetailInitial?.comments_number
                    : "0"}{" "}
                  نظر{" "}
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
                {expertDetailInitial?.created_at &&
                  formattedDate(expertDetailInitial?.created_at)}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center mt-2">
            <Button
              onClick={handleSelectExpert}
              className="bg-primary text-white rounded-lg text-xs px-3 py-2 hover:bg-primary"
            >
              انتخاب متخصص
            </Button>
          </div>
        </div>
        {expertSampleListInitial?.length > 0 && (
          <div className="w-full mx-auto">
            <WorkSamplesS expertSampleListInitial={expertSampleListInitial} />
          </div>
        )}
        <Comments data={expertDetailInitial?.comments} />
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
