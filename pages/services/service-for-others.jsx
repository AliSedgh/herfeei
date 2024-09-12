import React, { useState, useRef, useEffect } from "react";
import ServiceLayout from "../../components/layouts/service-layout";
import Breadcrumb from "../../components/breadCrumb";
import { sendServiceRecipient } from "../../core/api/serviceApi";
import { useRouter } from "next/router";
import { MultiStepProgressBar } from "../../components/multiStepProgressBar/MultiStepProgressBar";
import { toast } from "react-toastify";
import { useGetProfile } from "../../core/hooks/useProfileApi";
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

function SelectServiceForOthers() {
  const [me, setMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [initialValues, setInitialValues] = useState(usersProfile);
  const { data, isLoading } = useGetProfile();
  const router = useRouter();
  const nameRef = useRef();
  const phoneRef = useRef();

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

  const validateForm = () => {
    const errors = {};
    if (!nameRef.current.value) {
      errors.name = "وارد کردن نام و نام خانوادگی الزامی است";
    }
    if (!phoneRef.current.value) {
      errors.phone = "وارد کردن شماره موبایل الزامی است";
    } else if (!/^0\d{10}$/.test(phoneRef.current.value)) {
      errors.phone = "شماره موبایل باید شامل 11 رقم باشد و با صفر شروع شود";
    }
    return errors;
  };

  const submitHandler = async () => {
    // event.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const oId = localStorage.getItem("order_id");
      const res = await sendServiceRecipient({
        order_id: oId,
        for_other: "true",
        recipient: nameRef.current.value,
        recipient_number: phoneRef.current.value.slice(1),
      });

      if (res === 200) {
        if (!isLoading && data?.data) {
          if (
            initialValues?.full_name === null ||
            initialValues?.full_name === ""
          ) {
            router.push("/services/service-for-this-user");
          } else {
            router.push("/services/select-address");
          }
        }
      } else {
        toast.error("خطا در ارسال اطلاعات");
      }
    }
  };

  return (
    <>
      <div className="hidden md:block">
        <Breadcrumb paths={breadcrumbPaths} />
      </div>

      <MultiStepProgressBar step={3} />
      <div className="p-4">
        <h4 className="text-xl font-bold mb-4">
          مشخصات فرد مورد نظر را وارد نمایید:
        </h4>
        <form
          className="md:flex grid-cols-2 gap-4 mx-auto"
          onSubmit={submitHandler}
        >
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium">
              نام و نام خانوادگی
            </label>
            <input
              type="text"
              ref={nameRef}
              id="fullName"
              name="fullName"
              className="mt-3 input-container"
              placeholder=""
              defaultValue={nameRef?.current?.value}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="mobileNumber" className="block text-sm font-medium">
              شماره موبایل
            </label>
            <input
              type="text"
              ref={phoneRef}
              id="mobileNumber"
              name="mobileNumber"
              className="mt-3 input-container"
              placeholder=""
              defaultValue={phoneRef?.current?.value}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>
          {/* <div className="col-span-2">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              ارسال فرم
            </button>
          </div> */}
        </form>
      </div>
      <div className="h-[91px] w-[100vw] bg-white fixed bottom-0 right-0 [box-shadow:0px_-5px_10.300000190734863px_0px_#6164751A] pb-2 flex gap-2 md:gap-0 items-center justify-center px-2">
        <motion.button
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            router.push(`/services/select-service-for-who`);
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

export default SelectServiceForOthers;
