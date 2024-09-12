import React, { useEffect, useState } from "react";
import ServiceLayout from "../../components/layouts/service-layout";
import Breadcrumb from "../../components/breadCrumb";
import SeviceForWho from "../../components/shop/steps/sevice-for-who";
import { sendServiceRecipient } from "../../core/api/serviceApi";
import { useRouter } from "next/router";
import ProgressBar from "../../core/utils/progress-bar";
import { MultiStepProgressBar } from "../../components/multiStepProgressBar/MultiStepProgressBar";
import { useGetProfile } from "../../core/hooks/useProfileApi";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const usersProfile = {
  user: {
    id: 0,
    username: "",
    role: "",
    profile_name: "",
  },
  full_name: "",
  date_of_birth: "",
  city: 0,
  gender: "",
  mail: "",
  shaba_number: "",
  card_number: "",
  created_at: "",
};

function SelectServiceForWho() {
  const [me, setMe] = useState(true);
  const router = useRouter();
  const [initialValues, setInitialValues] = useState(usersProfile);
  const { data, isLoading } = useGetProfile();

  useEffect(() => {
    data?.data && setInitialValues(data?.data);
  }, [data?.data]);

  const breadcrumbPaths = [
    { label: "حرفه ای", link: "/" },
    { label: "سرویس ها", link: "/services" },
    { label: "سوالات", link: "/services" },
    { label: "توضیحات", link: "/services" },
    { label: "انتخاب سفارش دهنده", link: "/services" },
  ];

  const buttonVariants = {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 0 },
  };

  const handleOptionSelect = (option) => {
    if (option === "others") {
      setMe(false);
    } else if (option === "me") {
      setMe(true);
    }
  };
  const submitHandler = () => {
    if (!isLoading && data?.data) {
      if (me) {
        if (
          initialValues?.full_name === null ||
          initialValues?.full_name === ""
        ) {
          router.push("/services/service-for-this-user");
          // toast.error("لطفا نام و نام خانوادگی را وارد کنید");
        } else {
          router.push("/services/select-address");
        }
      } else {
        router.push("/services/service-for-others");
      }
    } else {
      toast.info("لطفا کمی صبر کنید ...");
    }
  };
  return (
    <>
      <div className="hidden md:block">
        <Breadcrumb paths={breadcrumbPaths} />
      </div>
      <MultiStepProgressBar step={3} />
      <SeviceForWho handleOptionSelect={handleOptionSelect} />
      <div className="h-[91px] w-[100vw] bg-white fixed bottom-0 right-0 [box-shadow:0px_-5px_10.300000190734863px_0px_#6164751A] pb-2 flex gap-2 md:gap-0 items-center justify-center px-2">
        <motion.button
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            router.push("/services/order-description");
          }}
          style={{ border: "1px solid red" }}
          className="md:mx-auto block px-6 md:px-12 whitespace-nowrap py-3 rounded-xl bg-white border-2 !border-mutedText !w-full md:!w-[173px] cursor-pointer"
        >
          مرحله قبل
        </motion.button>
        <motion.button
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="md:mx-auto  whitespace-nowrap block px-10 md:px-16  py-3 rounded-xl border-0 bg-primary text-white !w-full md:!w-[173px] cursor-pointer"
          onClick={() => {
            submitHandler();
          }}
        >
          ادامه
        </motion.button>
      </div>
    </>
  );
}

export default SelectServiceForWho;
