import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import {
  useGetExpertsSpecialty,
  usePostExpertEarlySignUp,
} from "../../core/hooks/useExpertApi";
import { Box, Button, Modal, Typography } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import useWindowWidth from "../../core/utils/useWindowWidth";
import HeroSecImg from "../../public/images/expertSignupHeroSec.png";
import ExpertsGalleryImg from "../../public/images/expertsGallery.png";
import CommentCloseButtonSvg from "../../public/icons/commentCloseButton.svg";
import SuccessIconSvg from "../../public/icons/successIcon.svg";
import WithoutMoneySvg from "../../public/icons/withoutMoney.svg";
import LessTimeSvg from "../../public/icons/lessTime.svg";
import GrowMoreSvg from "../../public/icons/growMore.svg";
import QuesArrowSvg from "../../public/icons/quesArrow.svg";
import HLogo from "../../public/images/hLogo.jpg";
import LimitLessLocationSvg from "../../public/icons/limitLessLocation.svg";
import { useGetSearchCity } from "../../core/hooks/useAddressApi";
import { useGetAllFaqs } from "../../core/hooks/useDashboardApi";
import { set } from "lodash";
import { useRouter } from "next/router";

const SignupSchema = Yup.object().shape({
  full_name: Yup.string().required("وارد کردن نام الزامی است"),
  phone_number: Yup.string()
    .matches(/^0\d{10}$/, "شماره تلفن باید 11 رقم باشد و با صفر شروع شود")
    .required("وارد کردن شماره موبایل الزامی است"),
  city: Yup.number().required("وارد کردن شهر الزامی است"),
  specialty: Yup.number().required("وارد کردن نوع تخصص الزامی است"),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const Index = () => {
  // const quesAnswer = [
  //   {
  //     id: 1,
  //     title: "چرا باید از این سامانه استفاده کنم؟",
  //     description: "چون سامانه بسیار خوب است",
  //   },
  //   {
  //     id: 2,
  //     title: "کجا می توانم متخصص پیدا کنم؟",
  //     description: "در سامانه می توانید متخصص پیدا کنید.",
  //   },
  //   {
  //     id: 3,
  //     title: "بهترین مکان برای تفریح کجاست؟",
  //     description:
  //       "سواحل شمال کشور یکی از بهترین مکان های تفریح در کشور هستند.",
  //   },
  // ];

  const { data: quesAnswer, isLoading: quesAnswerIsLoading } = useGetAllFaqs();
  const postExpertEarlySignUp = usePostExpertEarlySignUp();
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [modalSuccessMessage, setModalSuccessMessage] = useState("");
  const [modalErrorMessage, setModalErrorMessage] = useState("");
  const [cityList, setCityList] = useState([]);
  const [specialtyList, setSpecialtyList] = useState([]);
  const [openItemId, setOpenItemId] = useState(null);
  const [needEducation, setNeedEducation] = useState("NEED_EDUCATION");
  const [iAmExpert, setIAmExpert] = useState("I_AM_EXPERT");
  const [signUpType, setSignUpType] = useState(iAmExpert);

  const windowWidth = useWindowWidth();
  const router = useRouter();

  const { data: getSearchCity, isLoadingGetSearchCity } = useGetSearchCity();
  const { data: getExpertsSpecialty, isLoadingGetExpertsSpecialty } =
    useGetExpertsSpecialty();

  const handleToggle = (id) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  useEffect(() => {
    if (getSearchCity?.data) {
      setCityList(getSearchCity?.data);
    }
    if (getExpertsSpecialty?.data) {
      setSpecialtyList(getExpertsSpecialty?.data);
    }
  }, [getSearchCity?.data, getExpertsSpecialty?.data]);

  useEffect(() => {
    if (localStorage.getItem("sign_up_type") === "expert") {
      setSignUpType(iAmExpert);
    } else if (localStorage.getItem("sign_up_type") === "educator") {
      setSignUpType(needEducation);
    }
  }, []);

  const handleSuccessOpen = () => setOpenSuccess(true);
  const handleSuccessClose = () => setOpenSuccess(false);

  const handleErrorOpen = () => setOpenError(true);
  const handleErrorClose = () => setOpenError(false);

  function handleSubmit(values, { resetForm, setSubmitting }) {
    if (typeof values?.city === "string") {
      values.city = parseInt(values.city);
    }
    if (typeof values?.specialty === "string") {
      values.specialty = parseInt(values.specialty);
    }
    postExpertEarlySignUp.mutate(values, {
      onSuccess: (data) => {
        setSubmitting(false); // Enable the button again after success
        resetForm(); // Reset the form after successful submission
        if (data && data.status === 208) {
          setModalErrorMessage(
            "کاربر گرامی شما قبلا با این شماره در حرفه ای ثبت نام کرده اید. لطفا منتظر بمانید تا از پشتیبانی با شما تماس گرفته شود."
          );
          handleErrorOpen();
        } else if (data && data.status === 200) {
          setModalSuccessMessage(
            "اطلاعات شما با موفقیت ثبت شد و پشتیبانی “حرفه‌ای” بزودی با شما تماس خواهند گرفت."
          );
          handleSuccessOpen();
        } else {
          toast.error("خطایی رخ داده است. لطفا دوباره تلاش کنید.");
        }
      },
      onError: (error) => {
        setSubmitting(false); // Enable the button again after error
        toast.error("خطایی رخ داده است. لطفا دوباره تلاش کنید.");
        console.error("HError:", error);
      },
      onSettled: (data) => {
        setSubmitting(false); // Enable the button again after error
        console.log("HSettled:", data);
      },
    });
  }

  return (
    <>
      <div className="w-full mb-[100px]">
        <div className="w-full flex flex-col gap-4 lg:block lg:relative">
          <div className="w-full">
            <div className="relative mx-auto w-full h-[50vw] max-w-[1440px] overflow-hidden">
              <Image
                className="object-fill mx-auto"
                src={HeroSecImg.src}
                fill
                alt="hero"
              />
            </div>
          </div>
          <div className="lg:absolute lg:top-[50%] lg:-translate-y-[50%] lg:right-[6%] lg:w-[35%] lg:min-h-[73%] lg:shadow-none lg:[border:0px_solid_#E2E6E9] w-[93%] mx-auto p-4 bg-white [border:1px_solid_#E2E6E9] shadow-lg rounded-xl flex flex-col justify-center">
            <p className="text-[#0361FF] text-[16px] 2xs:text-[18px] sm:text-[22px] lg:text-[17px] xl:text-[22px] font-bold mx-auto">
              فرم ثبت نام متخصص
            </p>
            <div className="w-full h-[48px] grid grid-cols-2 gap-2 my-3">
              <div
                onClick={() => {
                  localStorage.removeItem("sign_up_type");
                  localStorage.setItem("sign_up_type", "expert");
                  setSignUpType(iAmExpert);
                }}
                className={`${
                  signUpType === "I_AM_EXPERT"
                    ? "bg-[#CDDFFF] text-[#0361FF]"
                    : "bg-[#F9F9F9] text-[#9E9E9E] hover:bg-[#CDDFFF] hover:text-[#0361FF]"
                } text-center place-content-center rounded-lg text-[14px] lg:text-[13px] xl:text-[14px] font-semibold cursor-pointer duration-300`}
              >
                متخصص هستم
              </div>
              <div
                onClick={() => {
                  localStorage.removeItem("sign_up_type");
                  localStorage.setItem("sign_up_type", "educator");
                  setSignUpType(needEducation);
                }}
                className={`${
                  signUpType === "NEED_EDUCATION"
                    ? "bg-[#CDDFFF] text-[#0361FF]"
                    : "bg-[#F9F9F9] text-[#9E9E9E] hover:bg-[#CDDFFF] hover:text-[#0361FF]"
                } text-center place-content-center rounded-lg text-[14px] lg:text-[13px] xl:text-[14px] font-semibold cursor-pointer duration-300`}
              >
                نیاز به آموزش دارم
              </div>
            </div>
            <Formik
              initialValues={{
                full_name: "",
                phone_number: "",
                city: cityList?.length ? cityList[0]?.id : "",
                specialty: specialtyList?.length ? specialtyList[0]?.id : "",
                sign_up_type: signUpType,
              }}
              validationSchema={SignupSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ isSubmitting }) => (
                <Form className="p-3 flex flex-col gap-8 lg:gap-4 xl:gap-8">
                  <p className="text-[18px] lg:text-[14px] xl:text-[18px] font-semibold text-[#212121] m-0 p-0">
                    اطلاعات شخصی
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label
                        className="text-[16px] lg:text-[14px] xl:text-[16px]"
                        htmlFor="full_name"
                      >
                        نام و نام خانوادگی
                      </label>
                      <Field
                        className="w-full min-h-[64px] lg:min-h-[44px] xl:min-h-[64px] px-2 rounded-lg bg-[#F9F9F9] [border:1px_solid_#EBEBEB] placeholder:text-[14px] lg:placeholder:text-[11px] xl:placeholder:text-[14px]"
                        type="text"
                        name="full_name"
                        placeholder="مثال: حمیدرضا طاهری"
                      />
                      <ErrorMessage
                        className="text-red-500 text-[12px]"
                        name="full_name"
                        component="div"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        className="text-[16px] lg:text-[14px] xl:text-[16px]"
                        htmlFor="city"
                      >
                        شهر
                      </label>
                      <Field
                        className="min-h-[64px] lg:min-h-[44px] xl:min-h-[64px] rounded-lg bg-[#F9F9F9] [border:1px_solid_#EBEBEB]"
                        as="select"
                        name="city"
                      >
                        {cityList?.map((city) => (
                          <option
                            key={city?.id}
                            className="text-[14px] p-2"
                            value={city?.id}
                          >
                            {city?.name}
                          </option>
                        ))}
                        {/* <option className="text-[14px] p-2" value="">
                          بوشهر
                        </option>
                        <option className="text-[14px] p-2" value="1">
                          شهر 1
                        </option>
                        <option className="text-[14px] p-2" value="2">
                          شهر 2
                        </option>
                        <option className="text-[14px] p-2" value="3">
                          شهر 3
                        </option> */}
                      </Field>
                      <ErrorMessage
                        className="text-red-500 text-[12px]"
                        name="city"
                        component="div"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        className="text-[16px] lg:text-[14px] xl:text-[16px]"
                        htmlFor="phone_number"
                      >
                        شماره موبایل
                      </label>
                      <Field
                        className="w-full min-h-[64px] lg:min-h-[44px] xl:min-h-[64px] px-2 rounded-lg bg-[#F9F9F9] [border:1px_solid_#EBEBEB] placeholder:text-[14px] lg:placeholder:text-[11px] xl:placeholder:text-[14px]"
                        type="text"
                        name="phone_number"
                        placeholder="مثال: 09363991452"
                      />
                      <ErrorMessage
                        className="text-red-500 text-[12px]"
                        name="phone_number"
                        component="div"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        className="text-[16px] lg:text-[14px] xl:text-[16px]"
                        htmlFor="specialty"
                      >
                        نوع تخصص
                      </label>
                      <Field
                        className="min-h-[64px] lg:min-h-[44px] xl:min-h-[64px] rounded-lg bg-[#F9F9F9] [border:1px_solid_#EBEBEB]"
                        as="select"
                        name="specialty"
                      >
                        {specialtyList?.map((specialty) => (
                          <option
                            key={specialty?.id}
                            className="text-[14px] p-2"
                            value={specialty?.id}
                          >
                            {specialty?.title}
                          </option>
                        ))}
                        {/* <option className="text-[14px] p-2" value="">
                          تعمیرات لوازم خانگی
                        </option>
                        <option className="text-[14px] p-2" value="1">
                          تخصص 1
                        </option>
                        <option className="text-[14px] p-2" value="2">
                          تخصص 2
                        </option>
                        <option className="text-[14px] p-2" value="3">
                          تخصص 3
                        </option> */}
                      </Field>
                      <ErrorMessage
                        className="text-red-500 text-[12px]"
                        name="specialty"
                        component="div"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="contained"
                    className="mx-auto rounded-lg py-[10px] px-[50px] lg:py-[6px] lg:px-[30px] xl:py-[10px] xl:px-[50px]"
                  >
                    {isSubmitting ? "در حال ارسال..." : "ثبت نام"}
                  </Button>
                  {/* <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "در حال ارسال..." : "ثبت نام"}
                </button> */}
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <Modal
          open={openSuccess}
          onClose={handleSuccessClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={style}
            className="rounded-lg min-h-[225px] w-[270px] 2xs:w-[343px] bg-white flex flex-col items-center justify-center"
          >
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div>
                <div className="relative w-[38px] h-[38px] overflow-hidden">
                  <Image
                    src={SuccessIconSvg.src}
                    alt="close"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="text-[18px] text-[#1A1D1F] font-semibold">
                ثبت نام اولیه
              </p>
              <Typography
                id="modal-modal-description"
                className="text-center text-[#535763] text-[14px] font-normal p-2"
              >
                {modalSuccessMessage}
              </Typography>
              <div
                onClick={handleSuccessClose}
                className="absolute top-[10px] right-[10px]"
              >
                <div className="relative w-[32px] h-[32px] overflow-hidden hover:scale-[1.03] cursor-pointer duration-300">
                  <Image
                    src={CommentCloseButtonSvg.src}
                    alt="close"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </Box>
        </Modal>
        <Modal
          open={openError}
          onClose={handleErrorClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={style}
            className="rounded-lg min-h-[172px] w-[270px] 2xs:w-[343px] bg-white flex items-center justify-center"
          >
            <div className="w-full h-full">
              <Typography
                id="modal-modal-description"
                className="text-center text-[#535763] text-[14px] font-normal p-2"
              >
                {modalErrorMessage}
              </Typography>
              <div
                onClick={handleErrorClose}
                className="absolute top-[10px] right-[10px]"
              >
                <div className="relative w-[32px] h-[32px] overflow-hidden hover:scale-[1.03] cursor-pointer duration-300">
                  <Image
                    src={CommentCloseButtonSvg.src}
                    alt="close"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </Box>
        </Modal>
        <div className="w-[90%] mx-auto mt-6 bg-[#B3D0FF] px-6 py-8 rounded-2xl flex flex-col md:flex-row gap-6 md:gap-2 items-center justify-between">
          <div className="w-[220px] text-[#0361FF] text-[30px] font-black text-center">
            چرا حرفه ای؟
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="bg-[rgba(3,97,255,0.7)] h-[80px] rounded-2xl flex gap-3 2xs:gap-4 md:gap-3 items-center justify-center">
              <div>
                <div className="relative w-[40px] h-[40px] overflow-hidden">
                  <Image
                    src={WithoutMoneySvg.src}
                    alt="close"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="text-white text-[15px] 2xs:text-[17px] md:text-[15px]">
                بدون سرمایه اولیه
              </div>
            </div>
            <div className="bg-[rgba(3,97,255,0.7)] h-[80px] rounded-2xl flex gap-3 2xs:gap-4 md:gap-3 items-center justify-center">
              <div>
                <div className="relative w-[40px] h-[40px] overflow-hidden">
                  <Image
                    src={LessTimeSvg.src}
                    alt="close"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="text-white text-[15px] 2xs:text-[17px] md:text-[15px]">
                درآمد بیشتر در زمان کمتر
              </div>
            </div>
            <div className="bg-[rgba(3,97,255,0.7)] h-[80px] rounded-2xl flex gap-3 2xs:gap-4 md:gap-3 items-center justify-center">
              <div>
                <div className="relative w-[40px] h-[40px] overflow-hidden">
                  <Image
                    src={GrowMoreSvg.src}
                    alt="close"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="text-white text-[15px] 2xs:text-[17px] md:text-[15px]">
                امکان رشد و پیشرفت
              </div>
            </div>
            <div className="bg-[rgba(3,97,255,0.7)] h-[80px] rounded-2xl flex gap-3 2xs:gap-4 md:gap-3 items-center justify-center">
              <div>
                <div className="relative w-[40px] h-[40px] overflow-hidden">
                  <Image
                    src={LimitLessLocationSvg.src}
                    alt="close"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="text-white text-[15px] 2xs:text-[17px] md:text-[15px]">
                بدون محدودیت مکانی
              </div>
            </div>
          </div>
        </div>
        <div className="w-[90%] md:w-[85%] mx-auto mt-10 md:h-[50vw] flex flex-col-reverse gap-6 md:gap-4 md:flex-row items-center justify-center">
          <div className="md:w-[55%] lg:w-[45%] xlp:w-[40%] md:h-full w-full py-1 md:py-0 flex flex-col justify-center items-center gap-4 lg:px-4">
            <p className="text-[#1A1D1F] text-[20px] 3xs:text-[25px] md:text-[20px] lg:text-[24px] xl:text-[32px] font-bold text-center m-0 p-0">
              به جمع متخصصان حرفه ای بپیوندید!
            </p>
            <div className="relative w-[245px] 3xs:w-[300px] md:w-full min-h-fit [border:1px_solid_#0361FF] rounded-2xl flex justify-center items-center p-6">
              <p className="m-0 p-0 text-[#29303C] text-[14px] font-normal 3xs:leading-[25px] md:leading-[20px] mm:leading-[25px] lg:leading-[20px] xl:leading-[30px] xlp:leading-[35px]">
                اگر شما یک متخصص در زمینه خدمات فنی می باشید، تیم “حرفه‌ای” از
                شما دعوت می نماید تا به مجموعه متخصصان ما بپیوندید و یا تخصصی
                ندارید ولی مشتاق هستید که در یک یا چند تخصص آموزش ببینید و پس از
                آن فرصت کار در مجموعه ما را داشته باشید می توانید از طریق راه
                های زیر اقدام کنید.{" "}
              </p>
              <span className="absolute bg-white w-[3px] h-[60%] top-[50%] -left-[2px] -translate-y-[50%]"></span>
              <span className="absolute bg-white w-[3px] h-[50%] top-[50%] -right-[2px] -translate-y-[50%]"></span>
              <span className="absolute bg-white w-[50%] h-[3px] -top-[2px] left-[50%] -translate-x-[50%]"></span>
              <span className="absolute bg-white w-[50%] h-[3px] -bottom-[2px] left-[50%] -translate-x-[50%]"></span>
            </div>
          </div>
          <div className="w-full h-full">
            <div className="relative w-full h-[80vw] md:h-full overflow-hidden">
              <Image
                src={ExpertsGalleryImg.src}
                alt="close"
                fill
                className="object-fill"
              />
            </div>
          </div>
        </div>
        <div className="w-full mt-[50px] flex flex-col gap-2">
          <div className="w-full mx-auto flex items-center justify-center mb-4">
            <p className="m-0 p-0 text-[18px] 3xs:text[19px] 2xs:text-[21px] xs:[22px] text-[#212121] font-bold">
              سوالات پرتکرار
            </p>
          </div>
          {!quesAnswerIsLoading &&
            quesAnswer?.map((item) => (
              <div key={item?.id} className="w-full flex flex-col gap-1">
                <div
                  className="w-[90%] lg:w-[908px] min-h-[78px] rounded-2xl mx-auto bg-[#F9F9F9] [border:1px_solid_#EBEBEB] hover:[border:1px_solid_#0361FF] shadow-sm hover:bg-[#B3D0FF] cursor-pointer duration-300 flex justify-between items-center gap-6 px-4 py-4"
                  onClick={() => handleToggle(item?.id)}
                >
                  <p className="m-0 p-0 text-right text-[14px] 2xs:text-[16px] text-[#212121] font-semibold">
                    {item?.title}
                  </p>
                  <div>
                    <div
                      className={`relative overflow-hidden w-[24px] h-[24px] duration-300 ${
                        openItemId === item?.id ? "rotate-180" : ""
                      }`}
                    >
                      <Image
                        src={QuesArrowSvg.src}
                        alt="QuesArrowSvg"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                <div
                  className={`w-[90%] lg:w-[908px] rounded-2xl mx-auto [border:1px_solid_#EBEBEB] duration-300 ${
                    openItemId === item?.id
                      ? "h-auto opacity-[1] p-4"
                      : "h-0 opacity-0 p-0"
                  }`}
                >
                  <p className="m-0 p-0 text-right text-[14px] 2xs:text-[15px] text-[#323232] font-normal">
                    {openItemId === item?.id ? item?.details : ""}
                  </p>
                </div>
              </div>
            ))}
        </div>
        <div className="flex mt-[50px] bg-[#3581FF] rounded-2xl mx-4 py-3 min-h-[6.5rem] items-center -sm:flex-wrap justify-evenly">
          <div className="flex flex-col items-center xs:flex-row p-1">
            <Image
              className="p-2 bg-[#fff] rounded-2xl mx-4"
              src={HLogo.src}
              alt="Takhasos Niro logo"
              width={66}
              height={66}
            />
            <p className="text-[17px] font-[700] text-[#FFFFFF]">
              دانلود اپلیکیشن حرفه ای
            </p>
          </div>

          <div className="flex items-center  flex-1 flex-col md:flex-row flex-wrap xl:gap-10 justify-evenly px-4 md:px-0">
            <div className=" w-full md:w-fit   m-1">
              <Button
                sx={{
                  borderRadius: "1rem",

                  color: "black",
                  bgcolor: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  height: "100%",
                  width: "100%",
                  ":hover": {
                    border: "1px solid",
                    boxShadow:
                      "inset 0 0 20px rgba(255, 255, 255, .5), 0 0 20px rgba(255, 255, 255, .5)",
                    outlineColor: "rgba(255, 255, 255, 0)",
                    outlineOffset: "15px",
                    textShadow: "1px 1px 2px #427388",
                    bgcolor: "#0cceff",
                  },
                }}
                variant="text"
              >
                <span>دریافت برای IOS</span>
                <Image
                  className=" -translate-y-0.5  xs:-translate-y-0.5 "
                  src="/icons/apple-ios.svg"
                  alt="Takhasos Niro logo"
                  width={40}
                  height={31}
                />
              </Button>
            </div>
            <div className="  w-full md:w-fit m-1">
              <Button
                href="https://myket.ir/app/com.herfeei.twa"
                target="_blank"
                sx={{
                  borderRadius: "1rem",

                  color: "black",
                  bgcolor: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  height: "100%",
                  width: "100%",
                  ":hover": {
                    border: "1px solid",
                    boxShadow:
                      "inset 0 0 20px rgba(255, 255, 255, .5), 0 0 20px rgba(255, 255, 255, .5)",
                    outlineColor: "rgba(255, 255, 255, 0)",
                    outlineOffset: "15px",
                    textShadow: "1px 1px 2px #427388",
                    bgcolor: "#0cceff",
                  },
                }}
                variant="text"
              >
                دریافت از
                <Image
                  className=""
                  src="/icons/myket.svg"
                  alt="Takhasos Niro logo"
                  width={100}
                  height={31}
                />
              </Button>
            </div>
            <div className=" w-full md:w-fit  m-1">
              <Button
                href="https://cafebazaar.ir/app/com.herfeei.twa"
                target="_blank"
                sx={{
                  borderRadius: "1rem",

                  color: "black",
                  bgcolor: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  height: "100%",
                  width: "100%",
                  ":hover": {
                    border: "1px solid",
                    boxShadow:
                      "inset 0 0 20px rgba(255, 255, 255, .5), 0 0 20px rgba(255, 255, 255, .5)",
                    outlineColor: "rgba(255, 255, 255, 0)",
                    outlineOffset: "15px",
                    textShadow: "1px 1px 2px #427388",
                    bgcolor: "#0cceff",
                  },
                }}
                variant="text"
              >
                دریافت از
                <Image
                  className=""
                  src="/icons/bazar.svg"
                  alt="Takhasos Niro logo"
                  width={75}
                  height={31}
                />
              </Button>
            </div>
            <div className=" w-full md:w-fit m-1">
              <Button
                sx={{
                  borderRadius: "1rem",

                  color: "black",
                  bgcolor: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  height: "100%",
                  width: "100%",
                  ":hover": {
                    border: "1px solid",
                    boxShadow:
                      "inset 0 0 20px rgba(255, 255, 255, .5), 0 0 20px rgba(255, 255, 255, .5)",
                    outlineColor: "rgba(255, 255, 255, 0)",
                    outlineOffset: "15px",
                    textShadow: "1px 1px 2px #427388",
                    bgcolor: "#0cceff",
                  },
                }}
                variant="text"
              >
                دریافت مستقیم برای اندروید{" "}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
