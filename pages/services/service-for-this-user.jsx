import React, { useState, useEffect, useContext, useRef } from "react";
import ServiceLayout from "../../components/layouts/service-layout";
import Breadcrumb from "../../components/breadCrumb";
import { useRouter } from "next/router";
import { MultiStepProgressBar } from "../../components/multiStepProgressBar/MultiStepProgressBar";
import RTLTextField from "../../components/RTLTextField";
import { Button, MenuItem, Select } from "@mui/material";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { motion } from "framer-motion";
import EditButton from "../../core/utils/EditButton";
import {
  useGetProfile,
  usePutUpdateProfile,
} from "../../core/hooks/useProfileApi";
import { ErrorMessage, Formik } from "formik";
import { UserContext } from "../../pages/_app";
import moment from "jalali-moment";
import { toast } from "react-toastify";
import * as Yup from "yup";

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

function SelectServiceForUse() {
  const router = useRouter();
  const url = router.pathname;
  const [initialValues, setInitialValues] = useState(usersProfile);
  const { data, isLoading } = useGetProfile();
  const putUpdateProfile = usePutUpdateProfile();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    data?.data && setInitialValues(data?.data);
  }, [data?.data]);

  const SignupSchema = Yup.object().shape({
    full_name: Yup.string().required("وارد کردن نام الزامی است"),
  });

  let dd = "";
  if (
    !isLoading &&
    data?.data &&
    data?.data.date_of_birth !== "" &&
    data?.data.date_of_birth !== null
  ) {
    dd = moment(data?.data.date_of_birth, "YYYY-MM-DD").format("jYYYY-jMM-jDD");
  } else {
    dd = "";
  }

  const breadcrumbPaths = [
    { label: "حرفه ای", link: "/" },
    { label: "سرویس ها", link: "/services" },
    { label: "سوالات", link: "/services" },
    { label: "توضیحات", link: "/services" },
    { label: "انتخاب سفارش دهنده", link: "/services" },
    { label: "اطلاعات کاربری", link: "/services" },
  ];

  const buttonVariants = {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 0 },
  };

  // const submitHandler = async () => {
  //   // if (
  //   //   (!isLoading && data?.data && initialValues?.full_name === "") ||
  //   //   initialValues?.full_name === null ||
  //   //   initialValues?.date_of_birth === "" ||
  //   //   initialValues?.date_of_birth === null ||
  //   //   initialValues?.mail === "" ||
  //   //   initialValues?.mail === null ||
  //   //   initialValues?.gender === "" ||
  //   //   initialValues?.gender === null
  //   // ) {
  //   //   toast.error("لطفا تمامی اطلاعات کاربری را تکمیل کنید");
  //   // } else {
  //   //   router.push("/services/select-address");
  //   //   // console.log("xcs", initialValues);
  //   // }
  //   if (!isLoading && data?.data) {
  //     if (
  //       initialValues?.full_name === null ||
  //       initialValues?.full_name === ""
  //     ) {
  //       toast.error("لطفا نام و نام خانوادگی را وارد کنید");
  //     } else {
  //       router.push("/services/select-address");
  //     }
  //   }
  // };

  const handleSubmit = (values) => {
    console.log("valuesD", values.date_of_birth);
    console.log(
      "valuesD",
      moment(values.date_of_birth, "jYYYY-jMM-jDD").format("YYYY-MM-DD")
    );
    const cleanedFullName = values.full_name.replace(/\s+/g, " ").trim();
    const payload = {
      // avatar: values.avatar.id,
      full_name: cleanedFullName,
      date_of_birth: values.date_of_birth,
      city: values.city,
      gender: values.gender,
      mail: values.mail,
      shaba_number: values.shaba_number,
      card_number: values.card_number,
      created_at: values.created_at,
    };

    Object.keys(payload).forEach((key) => {
      if (payload[key] === null) {
        delete payload[key];
      }
    });

    // putUpdateProfile.mutate(payload, {
    //   onSuccess: (res) => {
    //     console.log("resaq", res);
    //     if (res.message === "اطلاعات حساب کاربری با موفقیت به‌روزرسانی شد") {
    //       toast.success(res.message);
    //       setUser(values);
    //       if (!isLoading && data?.data) {
    //         if (
    //           initialValues?.full_name === null ||
    //           initialValues?.full_name === ""
    //         ) {
    //           toast.error("لطفا نام و نام خانوادگی را وارد کنید");
    //         } else {
    //           router.push("/services/select-address");
    //         }
    //       }
    //     } else {
    //       toast.error("خطا در بروزرسانی اطلاعات کاربر");
    //     }
    //   },
    // });

    if (cleanedFullName === null || cleanedFullName.trim() === "") {
      toast.error("لطفا نام و نام خانوادگی را وارد کنید");
    } else if (!/^\S+(?: \S+)*$/.test(cleanedFullName)) {
      toast.error("شما مجاز به استفاده از یک فاصله بین هر دو حرف هستید");
    } else {
      putUpdateProfile.mutate(payload, {
        onSuccess: (res) => {
          if (res.message === "اطلاعات حساب کاربری با موفقیت به‌روزرسانی شد") {
            toast.success(res.message);
            setUser(values);
            router.push("/services/select-address");
          } else {
            toast.error("خطا در بروزرسانی اطلاعات کاربر");
          }
        },
      });
    }
  };

  return (
    <div className="w-full p-4">
      <div className="hidden md:block">
        <Breadcrumb paths={breadcrumbPaths} />
      </div>
      <MultiStepProgressBar step={4} />
      <>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            handleSubmit(values);
            actions.resetForm();
          }}
          validationSchema={SignupSchema}
          enableReinitialize
        >
          {(props) => (
            <form form onSubmit={props.handleSubmit}>
              <div className="m-0 md:mt-0 rounded-xl w-full">
                <div className="flex items-start justify-start flex-wrap gap-6 mb-[150px]">
                  <div className="flex flex-col basis-[100%] lg:basis-[46%]">
                    <RenderTextField
                      label={"نام و نام خانوادگی"}
                      name={"full_name"}
                      value={props.values?.full_name}
                      defaultValue={""}
                      inputProps={{}}
                      handleChange={props.handleChange}
                      url={url}
                    />
                    <ErrorMessage
                      className="text-red-500 mr-2 text-[12px] 3xs:text-[14px]"
                      name="full_name"
                      component="div"
                    />
                  </div>
                  <div className="flex flex-col basis-[100%] lg:basis-[46%]">
                    <RenderTextField
                      label={"ایمیل"}
                      name={"mail"}
                      value={props.values?.mail}
                      defaultValue={"example@gmail.com"}
                      inputProps={{}}
                      handleChange={props.handleChange}
                      url={url}
                    />
                  </div>
                  <div className="flex flex-col basis-[100%] lg:basis-[46%]">
                    <RenderDatePicker
                      label={"تاریخ تولد"}
                      name={"date_of_birth"}
                      value={dd}
                      defaultValue={""}
                      setFieldValue={props.setFieldValue}
                      url={url}
                    />
                  </div>
                  <div className="flex flex-col basis-[100%] lg:basis-[46%]">
                    <RenderGenderPicker
                      label={"جنسیت"}
                      name={"gender"}
                      value={props.values?.gender}
                      defaultValue={""}
                      handleChange={props.handleChange}
                      url={url}
                    />
                  </div>
                </div>
                {/* <div className="flex items-center justify-start w-[220px] 2xs:w-max mx-auto">
                  <Button
                    type="submit"
                    variant="contained"
                    className="text-[11px] 2xs:text-[14px]"
                    sx={{
                      width: "140px",
                      m: ".5rem",
                      height: "2.25rem",
                      borderRadius: ".6rem",
                      margin: "0",
                      marginLeft: "15px",
                      // fontSize: "14px",
                    }}
                  >
                    ذخیره تغییرات
                  </Button>
                  <Button
                    onClick={() => {
                      props.resetForm();
                    }}
                    variant="outlined"
                    color="inherit"
                    className="text-[11px] 2xs:text-[14px]"
                    sx={{
                      width: "140px",
                      m: ".5rem",
                      height: "2.25rem",
                      borderRadius: ".6rem",
                      margin: "0",
                      border: "1px solid #999CA0",
                      // fontSize: "14px",
                    }}
                  >
                    انصراف
                  </Button>
                </div> */}
                <div className="h-[91px] w-[100vw] bg-white fixed bottom-0 right-0 [box-shadow:0px_-5px_10.300000190734863px_0px_#6164751A] pb-2 flex gap-2 md:gap-0 items-center justify-center px-2">
                  <motion.button
                    variants={buttonVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      props.resetForm();
                      router.push("/services/select-service-for-who");
                    }}
                    style={{ border: "1px solid red" }}
                    className="md:mx-auto block px-6 md:px-12 whitespace-nowrap py-3 rounded-xl bg-white border-2 !border-mutedText !w-full md:!w-[173px] cursor-pointer"
                  >
                    مرحله قبل
                  </motion.button>
                  <motion.button
                    type="submit"
                    variants={buttonVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="md:mx-auto  whitespace-nowrap block px-10 md:px-16  py-3 rounded-xl border-0 bg-primary text-white !w-full md:!w-[173px] cursor-pointer"
                  >
                    ادامه
                  </motion.button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </>
    </div>
  );
}

const RenderTextField = ({
  label,
  name,
  value,
  defaultValue,
  inputProps = {},
  handleChange,
  textItem,
  url,
}) => {
  // state active / deactive
  // const [active, setActive] = useState(false);
  // const ref = useRef();

  // useEffect(() => {
  //   active && ref.current?.focus();
  // }, [active]);

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className="text-[#000000] mb-1">
        {label}
      </label>
      <RTLTextField
        id={name}
        // inputRef={(elm) => (ref.current = elm)}
        // disabled={!active}
        variant="outlined"
        name={name}
        value={value}
        defaultValue={defaultValue}
        hiddenLabel
        onChange={handleChange}
        // InputProps={{
        //   endAdornment: url !== "/desk" && (
        //     <EditButton
        //       onClick={() => {
        //         setActive(!active);
        //       }}
        //       active={active}
        //     />
        //   ),
        //   ...inputProps,
        // }}
      />
      {textItem}
    </div>
  );
};

const RenderGenderPicker = ({
  label,
  name,
  value,
  defaultValue,
  handleChange,
  url,
}) => {
  // const [active, setActive] = useState(false);
  // const ref = useRef();

  // useEffect(() => {
  //   active && ref.current?.focus();
  // }, [active]);

  return (
    <div className="flex flex-col w-full">
      <label htmlFor="gender" className="text-[#000000] mb-1">
        جنسیت
      </label>
      <Select
        id={name}
        // inputRef={(elm) => (ref.current = elm)}
        // disabled={!active}
        name={name}
        label={label}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        // endAdornment={
        //   url !== "/desk" && (
        //     <EditButton
        //       onClick={() => {
        //         setActive(!active);
        //       }}
        //       active={active}
        //     />
        //   )
        // }
      >
        <MenuItem value={"FEMALE"}>زن</MenuItem>
        <MenuItem value={"MALE"}>مرد</MenuItem>
      </Select>
    </div>
  );
};

const RenderDatePicker = ({
  label,
  name,
  value,
  defaultValue,
  setFieldValue,
  url,
}) => {
  // const [active, setActive] = useState(false);
  // const ref = useRef();

  // useEffect(() => {
  //   active && ref.current?.focus();
  // }, [active]);

  return (
    <div className="flex flex-col w-full relative">
      <label htmlFor={name} className="text-[#000000] mb-1">
        {label}
      </label>
      <DatePicker
        id={name}
        // inputRef={(elm) => (ref.current = elm)}
        // disabled={!active}
        name={name}
        calendar={persian}
        locale={persian_fa}
        inputClass="border hover:border-solid hover:border-[black] w-full p-[1.15rem] rounded focus:border-2 focus:outline-none focus:border-[#2E82D6]"
        calendarPosition="bottom-right"
        value={value}
        defaultValue={defaultValue}
        onChange={(date) => {
          // const formattedDate = moment(date).format("YYYY-MM-DD");
          // setFieldValue(name, formattedDate);
          const newDate = new Date(date);
          const newYear = newDate.getFullYear();
          const newMonth = newDate.getMonth() + 1;
          const newDay = newDate.getDate();
          const formattedDay = `${newYear}-${newMonth}-${newDay}`;
          setFieldValue(name, formattedDay);
          console.log("valuesDD", formattedDay);
        }}
      />
      {/* {url !== "/desk" && (
        <div className="absolute left-0 bottom-[30px]">
          <EditButton
            onClick={() => {
              setActive(!active);
            }}
            active={active}
          />
        </div>
      )} */}
    </div>
  );
};

export default SelectServiceForUse;
