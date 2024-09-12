import React, { useRef, useState } from "react";
import useServiceStepsStore from "../../store/serviceStepsStore";
import Modal from "../../components/ui/modal";
import useModalStore from "../../store/modalStore";
import BreadCrumb from "../../components/breadCrumb";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  LocationOnOutlined,
  AccessTimeOutlined,
  Close,
} from "@mui/icons-material";
import Image from "next/image";
import { useGetUserOrderDetail } from "../../core/hooks/useOrderApi";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import {
  usePostCheckDiscountCode,
  usePostOrderConfirmation,
} from "../../core/hooks/useServiceApi";
import { MultiStepProgressBar } from "../../components/multiStepProgressBar/MultiStepProgressBar";
import { format } from "date-fns-jalali";
import { faIR } from "date-fns-jalali/locale";
import InfoCircleSvg from "../../public/icons/infoCircle.svg";
import { toast } from "react-toastify";
import Link from "next/link";

function SubmitOrder() {
  const {
    selectedOptions,
    showServiceForWho,
    showUserDetail,
    showAddresses,
    showSelectedDate,
    showSelectedExpert,
  } = useServiceStepsStore();
  const [discountCode, setDiscountCode] = useState("");
  const [sendDiscountCode, setSendDiscountCode] = useState(null);
  const [checked, setChecked] = React.useState({
    termsAndConditions: false,
    emailReceipt: false,
  });
  const [termsAndConditionsError, setTermsAndConditionsError] = useState(false);
  const router = useRouter();
  const permissionRef = useRef();
  const orderId = localStorage.getItem("order_id");
  const { data, isLoading } = useGetUserOrderDetail(orderId);
  const postOrderConfirmation = usePostOrderConfirmation();
  console.log("ssd", data?.data);

  const postCheckDiscountCode = usePostCheckDiscountCode();

  const categoryTitle = localStorage.getItem("category_title_modal");

  const buttonVariants = {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 0 },
  };

  const handleChange = (event) => {
    setChecked({ ...checked, [event.target.name]: event.target.checked });
    setTermsAndConditionsError(false);
  };
  console.log("plo", checked);
  // Dummy data for order details
  const orderDetails = {
    برند: data?.data.answers[1].title,
    "نوع محصول": data?.data.answers[0].title,
    "سفارش برای": data?.data.for_other
      ? "برای فرد دیگر " + "(" + data?.data.recipient + ")"
      : "برای خودم",
    "خدمت درخواستی": data?.data.service.items
      .map((item) => item.title)
      .join(" - "),
    "توضیحات بیشتر":
      data?.data.description === ""
        ? "توضیحی ارائه نشده است!"
        : data?.data.description,
  };

  const convertToJalaliDate = (gregorianDate) => {
    // تبدیل تاریخ میلادی به تاریخ شمسی و قالب‌بندی آن
    return format(new Date(gregorianDate), "EEEE dd MMMM", { locale: faIR });
  };

  console.log(
    "data?.for_other",
    data && convertToJalaliDate(data?.data.order_date)
  );

  console.log("kfl", data && data?.data);

  const neighborhood = data?.user_address?.neighborhood ?? "";
  const details = data?.user_address?.details ?? "";
  const title = data?.user_address?.title ?? "";
  const fullAddress = neighborhood + " - " + details + " - " + title;
  const timeData =
    data?.data.order_time === null ? "" : data?.data.order_time.split("-")[0];
  const time = timeData > 12 ? timeData - 12 : timeData;

  const { isOpen, openModal, closeModal } = useModalStore();

  const handleSubmitOrder = () => {};
  const breadcrumbPaths = [
    { label: "حرفه ای", link: "/" },
    { label: "سرویس ها", link: "/services" },
    { label: "سوالات", link: "/services" },
    { label: "توضیحات", link: "/services" },
    { label: "انتخاب سفارش دهنده", link: "/services" },
    { label: "اطلاعات کاربری", link: "/services" },
    { label: "آدرس", link: "/services" },
    { label: "زمان", link: "/services" },
    { label: "متخصص", link: "/services" },
    { label: "ثبت نهایی", link: "/services" },
  ];
  const handleSubmit = (postData) => {
    postOrderConfirmation.mutate(postData, {
      onSuccess: (postData) => {
        localStorage.setItem("order_track_id", postData?.data.order_track_id);
        toast.success(
          " درخواست شما با موفقیت ثبت شد و کارشناس تا دقایقی دیگر با شما تماس خواهد گرفت. "
        );
        router.replace("/profile");
      },
      onSettled: (postData) => {
        console.log("datas:settled", postData);
        // toast.error("خطایی رخ داده است")
      },
      onError: (postData) => {
        // console.log("datas:onError", postData);
        toast.error("خطایی رخ داده است");
      },
    });
  };

  const handleDiscountCheck = () => {
    postCheckDiscountCode.mutate(
      {
        discount: discountCode,
        order_id: orderId,
      },
      {
        onSuccess: (res) => {
          console.log("res", res);
          if (res.status == 200) {
            toast.success("کد تخفیف معتبر است");
            setSendDiscountCode(discountCode);
            setDiscountCode("");
          } else {
            toast.error("کد وارد شده صحیح نمی باشد");
            setSendDiscountCode(null);
          }
        },
        onSettled: (res) => {
          console.log("res:settled", res);
        },
        onError: (res) => {
          console.log("res:onError", res);
          toast.error("خطایی رخ داده است");
        },
      }
    );
  };

  console.log("lpi", sendDiscountCode);

  return (
    <>
      <div className="hidden md:block">
        <BreadCrumb paths={breadcrumbPaths} />
      </div>
      <div className="mx-auto p-4 mb-32">
        <div className="w-full translate-x-[6px]">
          <MultiStepProgressBar step={8} />
        </div>
        <div>
          <div className="mb-10 bg-[#f9f9f9] md:bg-white p-2 shadow-lg rounded-[8px] border-solid border-[#D9D9D9] px-10 border-2 order-[#D9D9D9]">
            {isLoading ? (
              <p>Loading ...</p>
            ) : (
              <>
                <h2 className="text-[16px]  font-semibold mb-8">
                  جزییات سفارش:
                </h2>
                <div className="flex items-center gap-3">
                  <div className="relative w-[80px] h-[80px] border-solid !border-1 rounded-lg border-[#EBEBEB]">
                    <Image
                      src={
                        data?.data.service.category.category_image
                          ? data?.data.service.category.category_image
                          : "/images/blog.png"
                      }
                      layout="fill"
                      alt="product"
                    />
                  </div>
                  <div className="font-bold">
                    {data?.data.service.category.title}
                  </div>
                </div>
                <div
                  className="md:flex !mb-3 items-center  m pt-4 pb-2  border-solid !border-[1px] border-[#D9D9D9] border-x-transparent border-y-borderColor  gap-10 my-4
            "
                >
                  <div className="flex   gap-1 items-center">
                    <LocationOnOutlined />
                    <div>{fullAddress}</div>
                  </div>
                  <div className="flex gap-1 items-center">
                    <AccessTimeOutlined />
                    <div>
                      {data?.data.order_date === null ||
                      data?.data.order_date === undefined
                        ? ""
                        : convertToJalaliDate(data?.data.order_date) +
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
                    </div>
                  </div>
                </div>
                <ul className="list-disc pl-4 mb-6">
                  {data &&
                    data?.data?.answers.map((item) => (
                      <li key={item?.id} className="my-2 text-[14px]">
                        <strong>{item?.title}</strong>
                      </li>
                    ))}
                  <li className="my-2 text-[14px]">
                    سفارش برای
                    <span> : </span>
                    <strong>
                      {data?.data.for_other
                        ? "برای فرد دیگر " + "(" + data?.data.recipient + ")"
                        : "برای خودم"}
                    </strong>
                  </li>
                  <li className="my-2 text-[14px]">
                    توضیحات بیشتر
                    <span> : </span>
                    <strong>
                      {data && data?.data.description === ""
                        ? "توضیحی ارائه نشده است!"
                        : data?.data.description}
                    </strong>
                  </li>
                </ul>
              </>
            )}
          </div>

          {/* Add inputs for discount code and conditions */}
          <div className="mb-4 p-4  border-solid border-[#EBEBEB] border-borderColor rounded-lg shodow-none  ">
            <label className="block text-center mb-3 rounded-lg text-sm font-semibold">
              اگر کد تخفیف دارید آن را در قسمت زیر وارد کنید
            </label>
            <div className="flex border-solid  !border-[1px] border-[#EBEBEB] p-3 md:max-w-[489px] !rounded-lg mx-auto">
              <input
                placeholder="کد تخفیف خود را وارد کنید"
                type="text"
                className="w-full bg-[#f9f9f9] placeholder:text-center px-4 py-2 border rounded-lg whitespace-nowrap w- focus:outline-none focus:border-primary"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <button
                onClick={handleDiscountCheck}
                className="button px-2 mx-3 text-[12px] p-0 border-0 max-w-[99px] whitespace-nowrap"
              >
                بررسی کد تخفیف
              </button>
            </div>
          </div>
          <div className="shadow-md p-3  rounded-lg">
            <div className="w-full flex flex-col !text-[14px]]">
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      inputRef={(elm) => (permissionRef.current = elm)}
                      // ref={permissionRef}
                      checked={checked?.termsAndConditions}
                      onChange={handleChange}
                      name="termsAndConditions"
                      className=" !w-[1rem] text-[#D6D6D6]   mx-0 ml-2 !rounded-2xl"
                    />
                  }
                  className="w-full whitespace-break-spaces mt-6 mx-1 !text-[14px] "
                  label={
                    <p>
                      پذیرش{" "}
                      <Link
                        className="underline text-blue-400"
                        href="/profile/rules"
                      >
                        شرایط و قوانین سایت حرفه‌ای
                      </Link>
                    </p>
                  }
                />
              </div>
              {termsAndConditionsError && (
                <div className="flex w-fit items-center justify-center gap-1 mx-1">
                  <div className="relative w-[24px] h-[24px] overflow-hidden">
                    <Image src={InfoCircleSvg.src} alt="danger" fill />
                  </div>
                  <p className="m-0 p-0 text-red-500 text-[13px]">
                    امکان ثبت سرویس بدون پذیرش شرایط و قوانین وجود ندارد
                  </p>
                </div>
              )}
            </div>
            {/* <FormControlLabel
              className="mx-1"
              control={
                <Checkbox
                  checked={checked.emailReceipt}
                  onChange={handleChange}
                  name="emailReceipt"
                  className=" !w-[1rem] mx-0 ml-2 text-[#D6D6D6] rounded-xl"
                />
              }
              label="ارسال رسید به ایمیل"
            /> */}
          </div>
        </div>
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
            router.push("/services/select-expert");
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
            if (checked.termsAndConditions) {
              handleSubmit({
                order_id: orderId,
                confirmation: "accepted",
                discount: sendDiscountCode,
              });
            } else {
              setTermsAndConditionsError(true);
              permissionRef.current?.scrollIntoView({ behavior: "smooth" });
              permissionRef.current?.focus();
            }
          }}
        >
          ثبت نهایی
        </motion.button>
      </div>

      {/* Render the modal component conditionally */}
      {isOpen && (
        <Modal
          title="ثبت موفق"
          description=" درخواست شما با موفقیت ثبت شد و کارشناس تا دقایقی دیگر با شما تماس خواهد گرفت. "
          code={localStorage.getItem("order_track_id")}
          button1={{ title: "پیگیری سفارش", href: "/order" }}
        />
      )}
    </>
  );
}

export default SubmitOrder;
