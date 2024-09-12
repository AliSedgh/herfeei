// import React, { useState, useEffect, useContext, useRef } from "react";
// import RTLTextField from "../RTLTextField";
// import { Button, MenuItem, Select } from "@mui/material";
// // import DatePicker from "react-multi-date-picker";
// // import persian from "react-date-object/calendars/persian";
// // import persian_fa from "react-date-object/locales/persian_fa";
// import EditButton from "../../core/utils/EditButton";
// import {
//   useGetProfile,
//   usePutUpdateProfile,
// } from "../../core/hooks/useProfileApi";
// import { Formik } from "formik";
// import { useRouter } from "next/router";
// import { UserContext } from "../../pages/_app";
// // import { format } from "date-fns-jalali";

// const usersProfile = {
//   user: {
//     id: 0,
//     username: "",
//     role: "",
//     profile_name: "",
//   },
//   full_name: "",
//   date_of_birth: "",
//   city: 0,
//   gender: "",
//   mail: "",
//   shaba_number: "",
//   card_number: "",
//   created_at: "",
// };

// const UserProfileForm = ({ service }) => {
//   const router = useRouter();
//   const url = router.pathname;
//   const [initialValues, setInitialValues] = useState(usersProfile);
//   const { data, isLoading } = useGetProfile();
//   const putUpdateProfile = usePutUpdateProfile();
//   const { setUser } = useContext(UserContext);

//   useEffect(() => {
//     data?.data && setInitialValues(data?.data);
//   }, [data?.data]);

//   const handleSubmit = (values) => {
//     const payload = {
//       // avatar: values.avatar.id,
//       full_name: values.full_name,
//       date_of_birth: values.date_of_birth,
//       city: values.city,
//       gender: values.gender,
//       mail: values.mail,
//       shaba_number: values.shaba_number,
//       card_number: values.card_number,
//       created_at: values.created_at,
//     };
//     putUpdateProfile.mutate(payload);
//     setUser(values);
//   };

//   // const datee = data && !isLoading && initialValues.date_of_birth; //1998-02-17
//   // let dd = "";
//   // if (datee) {
//   //   // ابتدا تاریخ را به اجزاء سال، ماه و روز تقسیم کنید
//   //   const [year, month, day] = datee.split("-");

//   //   // حذف صفر ابتدایی با استفاده از parseInt
//   //   const formattedDay = parseInt(day, 10);
//   //   const formattedMonth = parseInt(month, 10);

//   //   // تبدیل به فرمت "17-2-1998"
//   //   const formattedDate1 = `${formattedDay}-${formattedMonth}-${year}`;
//   //   console.log("تاریخ به فرمت 17-2-1998:", formattedDate1); // 17-2-1998

//   //   // تبدیل به فرمت "1998,2,17"
//   //   const formattedDate2 = `${year},${formattedMonth},${formattedDay}`;

//   //   dd = format(new Date(formattedDate2), "yyyy/MM/dd");
//   // }

//   return (
//     <>
//       <Formik
//         initialValues={initialValues}
//         onSubmit={(values, actions) => {
//           handleSubmit(values);
//           actions.resetForm();
//           if (!service && url !== "/desk") {
//             router.push("/profile");
//           } else if (url === "/desk") {
//             router.push("/desk");
//           }
//         }}
//         enableReinitialize
//       >
//         {(props) => (
//           <form form onSubmit={props.handleSubmit}>
//             <div className="md:p-6 m-0 md:mt-0  rounded-xl w-full ">
//               <div className="flex items-start justify-start flex-wrap">
//                 <RenderTextField
//                   label={"نام و نام خانوادگی"}
//                   name={"full_name"}
//                   value={props.values?.full_name}
//                   defaultValue={""}
//                   inputProps={{}}
//                   handleChange={props.handleChange}
//                   url={url}
//                 />
//                 <RenderTextField
//                   label={"ایمیل"}
//                   name={"mail"}
//                   value={props.values?.mail}
//                   defaultValue={"example@gmail.com"}
//                   inputProps={{}}
//                   handleChange={props.handleChange}
//                   url={url}
//                 />
//                 {/* <RenderDatePicker
//                   label={"تاریخ تولد"}
//                   name={"date_of_birth"}
//                   value={dd}
//                   defaultValue={""}
//                   setFieldValue={props.setFieldValue}
//                   url={url}
//                 /> */}
//                 {!service && (
//                   <RenderTextField
//                     label={"شماره کارت"}
//                     name={"card_number"}
//                     value={props.values?.card_number}
//                     defaultValue={"0000-0000-0000-0000"}
//                     inputProps={{}}
//                     handleChange={props.handleChange}
//                   />
//                 )}
//                 <RenderGenderPicker
//                   label={"جنسیت"}
//                   name={"gender"}
//                   value={props.values?.gender}
//                   defaultValue={""}
//                   handleChange={props.handleChange}
//                   url={url}
//                 />
//                 {!service && (
//                   <RenderTextField
//                     label={"شماره شبا"}
//                     name={"shaba_number"}
//                     value={props.values?.shaba_number}
//                     defaultValue={"0000000000000000"}
//                     inputProps={{}}
//                     handleChange={props.handleChange}
//                     textItem={
//                       <p className="text-start px-2 basis-[100%] text-[#999BA7] text-sm">
//                         *اطلاعات حساب بانکی به منظور واریز هدیه و استرداد هزینه
//                         دریافت می‌شود.
//                       </p>
//                     }
//                   />
//                 )}
//               </div>
//               <div className="flex items-center justify-start w-[220px] 2xs:w-max mx-auto">
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   className="text-[11px] 2xs:text-[14px]"
//                   sx={{
//                     width: "140px",
//                     m: ".5rem",
//                     height: "2.25rem",
//                     borderRadius: ".6rem",
//                     margin: "0",
//                     marginLeft: "15px",
//                     // fontSize: "14px",
//                   }}
//                 >
//                   ذخیره تغییرات
//                 </Button>
//                 <Button
//                   onClick={() => {
//                     props.resetForm();
//                     if (!service && url !== "/desk") {
//                       router.push("/profile");
//                     } else if (url === "/desk") {
//                       router.push("/desk");
//                     }
//                   }}
//                   variant="outlined"
//                   color="inherit"
//                   className="text-[11px] 2xs:text-[14px]"
//                   sx={{
//                     width: "140px",
//                     m: ".5rem",
//                     height: "2.25rem",
//                     borderRadius: ".6rem",
//                     margin: "0",
//                     border: "1px solid #999CA0",
//                     // fontSize: "14px",
//                   }}
//                 >
//                   انصراف
//                 </Button>
//               </div>
//             </div>
//           </form>
//         )}
//       </Formik>
//     </>
//   );
// };

// const RenderTextField = ({
//   label,
//   name,
//   value,
//   defaultValue,
//   inputProps = {},
//   handleChange,
//   textItem,
//   url,
// }) => {
//   // state active / deactive
//   const [active, setActive] = useState(false);
//   const ref = useRef();

//   useEffect(() => {
//     active && ref.current?.focus();
//   }, [active]);

//   return (
//     <div className="flex flex-col m-2 basis-[100%] lg:basis-[46%]">
//       <label htmlFor={name} className="text-[#000000] mb-1">
//         {label}
//       </label>
//       <RTLTextField
//         id={name}
//         inputRef={(elm) => (ref.current = elm)}
//         disabled={!active}
//         variant="outlined"
//         name={name}
//         value={value}
//         defaultValue={defaultValue}
//         hiddenLabel
//         onChange={handleChange}
//         InputProps={{
//           endAdornment: url !== "/desk" && (
//             <EditButton
//               onClick={() => {
//                 setActive(!active);
//               }}
//               active={active}
//             />
//           ),
//           ...inputProps,
//         }}
//       />
//       {textItem}
//     </div>
//   );
// };

// const RenderGenderPicker = ({
//   label,
//   name,
//   value,
//   defaultValue,
//   handleChange,
//   url,
// }) => {
//   const [active, setActive] = useState(false);
//   const ref = useRef();

//   useEffect(() => {
//     active && ref.current?.focus();
//   }, [active]);

//   return (
//     <div className="flex flex-col m-2 basis-[100%] lg:basis-[46%]">
//       <label htmlFor="gender" className="text-[#000000] mb-1">
//         جنسیت
//       </label>
//       <Select
//         id={name}
//         inputRef={(elm) => (ref.current = elm)}
//         disabled={!active}
//         name={name}
//         label={label}
//         value={value}
//         defaultValue={defaultValue}
//         onChange={handleChange}
//         endAdornment={
//           url !== "/desk" && (
//             <EditButton
//               onClick={() => {
//                 setActive(!active);
//               }}
//               active={active}
//             />
//           )
//         }
//       >
//         <MenuItem value={"FEMALE"}>زن</MenuItem>
//         <MenuItem value={"MALE"}>مرد</MenuItem>
//       </Select>
//     </div>
//   );
// };

// // const RenderDatePicker = ({
// //   label,
// //   name,
// //   value,
// //   defaultValue,
// //   setFieldValue,
// //   url,
// // }) => {
// //   const [active, setActive] = useState(false);
// //   const ref = useRef();
// //   // console.log("vbc", value);

// //   useEffect(() => {
// //     active && ref.current?.focus();
// //   }, [active]);
// //   return (
// //     <div className="flex flex-col m-2 basis-[100%] lg:basis-[46%] relative">
// //       <label htmlFor={name} className="text-[#000000] mb-1">
// //         {label}
// //       </label>
// //       <DatePicker
// //         id={name}
// //         inputRef={(elm) => (ref.current = elm)}
// //         disabled={!active}
// //         name={name}
// //         calendar={persian}
// //         locale={persian_fa}
// //         inputClass="border hover:border-solid hover:border-[black] w-full p-[1.15rem] rounded focus:border-2 focus:outline-none focus:border-[#2E82D6]"
// //         calendarPosition="bottom-right"
// //         value={value}
// //         defaultValue={defaultValue}
// //         onChange={(date) => {
// //           // const newDate = date.format("YYYY-MM-DD"); // "1376-04-07"
// //           // setFieldValue(name, newDate);
// //           const newDate = new Date(date);
// //           const newYear = newDate.getFullYear();
// //           const newMonth = newDate.getMonth() + 1;
// //           const newDay = newDate.getDate();
// //           const formatedDay = `${newYear}-${newMonth}-${newDay}`;
// //           setFieldValue(name, formatedDay);
// //         }}
// //       />
// //       {url !== "/desk" && (
// //         <div className="absolute left-0 bottom-[30px]">
// //           <EditButton
// //             onClick={() => {
// //               setActive(!active);
// //             }}
// //             active={active}
// //           />
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// export default UserProfileForm;

import React, { useState, useEffect, useContext, useRef } from "react";
import RTLTextField from "../RTLTextField";
import { Button, MenuItem, Select } from "@mui/material";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import EditButton from "../../core/utils/EditButton";
import {
  useGetProfile,
  usePutUpdateProfile,
} from "../../core/hooks/useProfileApi";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { UserContext } from "../../pages/_app";
import moment from "jalali-moment";
import { toast } from "react-toastify";

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

const UserProfileForm = ({ service }) => {
  const router = useRouter();
  const url = router.pathname;
  const [initialValues, setInitialValues] = useState(usersProfile);
  const { data, isLoading } = useGetProfile();
  const putUpdateProfile = usePutUpdateProfile();
  const { setUser } = useContext(UserContext);

  // useEffect(() => {
  //   if (data?.data) {
  //     setInitialValues({
  //       ...data?.data,
  //       date_of_birth: moment(data?.data.date_of_birth, "YYYY-MM-DD").format(
  //         "jYYYY-jMM-jDD"
  //       ),
  //     });
  //   }
  // }, [data?.data]);

  useEffect(() => {
    data?.data && setInitialValues(data?.data);
  }, [data?.data]);

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

  const handleSubmit = (values) => {
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

    putUpdateProfile.mutate(payload);
    setUser(values);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          const cleanedFullName = values.full_name.replace(/\s+/g, " ").trim();
          if (
            !service &&
            url !== "/desk" &&
            cleanedFullName &&
            !/^\S+(?: \S+)*$/.test(cleanedFullName)
          ) {
            toast.error("شما مجاز به استفاده از یک فاصله بین هر دو حرف هستید");
          } else {
            handleSubmit(values);
            actions.resetForm();
            if (!service && url !== "/desk") {
              router.push("/profile");
            } else if (url === "/desk") {
              router.push("/desk");
            }
          }
        }}
        enableReinitialize
      >
        {(props) => (
          <form form onSubmit={props.handleSubmit}>
            <div className="md:p-6 m-0 md:mt-0 rounded-xl w-full">
              <div className="flex items-start justify-start flex-wrap">
                <RenderTextField
                  label={"نام و نام خانوادگی"}
                  name={"full_name"}
                  value={props.values?.full_name}
                  defaultValue={""}
                  inputProps={{}}
                  handleChange={props.handleChange}
                  url={url}
                />
                <RenderTextField
                  label={"ایمیل"}
                  name={"mail"}
                  value={props.values?.mail}
                  defaultValue={"example@gmail.com"}
                  inputProps={{}}
                  handleChange={props.handleChange}
                  url={url}
                />
                <RenderDatePicker
                  label={"تاریخ تولد"}
                  name={"date_of_birth"}
                  value={dd}
                  defaultValue={""}
                  setFieldValue={props.setFieldValue}
                  url={url}
                />
                {!service && (
                  <RenderTextField
                    label={"شماره کارت"}
                    name={"card_number"}
                    value={props.values?.card_number}
                    defaultValue={"0000-0000-0000-0000"}
                    inputProps={{}}
                    handleChange={props.handleChange}
                  />
                )}
                <RenderGenderPicker
                  label={"جنسیت"}
                  name={"gender"}
                  value={props.values?.gender}
                  defaultValue={""}
                  handleChange={props.handleChange}
                  url={url}
                />
                {!service && (
                  <RenderTextField
                    label={"شماره شبا"}
                    name={"shaba_number"}
                    value={props.values?.shaba_number}
                    defaultValue={"0000000000000000"}
                    inputProps={{}}
                    handleChange={props.handleChange}
                    textItem={
                      <p className="text-start px-2 basis-[100%] text-[#999BA7] text-sm">
                        *اطلاعات حساب بانکی به منظور واریز هدیه و استرداد هزینه
                        دریافت می‌شود.
                      </p>
                    }
                  />
                )}
              </div>
              <div className="flex items-center justify-start w-[220px] 2xs:w-max mx-auto">
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
                    if (!service && url !== "/desk") {
                      router.push("/profile");
                    } else if (url === "/desk") {
                      router.push("/desk");
                    }
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
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

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
  const [active, setActive] = useState(false);
  const ref = useRef();

  useEffect(() => {
    active && ref.current?.focus();
  }, [active]);

  return (
    <div className="flex flex-col m-2 basis-[100%] lg:basis-[46%]">
      <label htmlFor={name} className="text-[#000000] mb-1">
        {label}
      </label>
      <RTLTextField
        id={name}
        inputRef={(elm) => (ref.current = elm)}
        disabled={!active}
        variant="outlined"
        name={name}
        value={value}
        defaultValue={defaultValue}
        hiddenLabel
        onChange={handleChange}
        InputProps={{
          endAdornment: url !== "/desk" && (
            <EditButton
              onClick={() => {
                setActive(!active);
              }}
              active={active}
            />
          ),
          ...inputProps,
        }}
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
  const [active, setActive] = useState(false);
  const ref = useRef();

  useEffect(() => {
    active && ref.current?.focus();
  }, [active]);

  return (
    <div className="flex flex-col m-2 basis-[100%] lg:basis-[46%]">
      <label htmlFor="gender" className="text-[#000000] mb-1">
        جنسیت
      </label>
      <Select
        id={name}
        inputRef={(elm) => (ref.current = elm)}
        disabled={!active}
        name={name}
        label={label}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        endAdornment={
          url !== "/desk" && (
            <EditButton
              onClick={() => {
                setActive(!active);
              }}
              active={active}
            />
          )
        }
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
  const [active, setActive] = useState(false);
  const ref = useRef();

  useEffect(() => {
    active && ref.current?.focus();
  }, [active]);

  return (
    <div className="flex flex-col m-2 basis-[100%] lg:basis-[46%] relative">
      <label htmlFor={name} className="text-[#000000] mb-1">
        {label}
      </label>
      <DatePicker
        id={name}
        inputRef={(elm) => (ref.current = elm)}
        disabled={!active}
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
        }}
      />
      {url !== "/desk" && (
        <div className="absolute left-0 bottom-[30px]">
          <EditButton
            onClick={() => {
              setActive(!active);
            }}
            active={active}
          />
        </div>
      )}
    </div>
  );
};

export default UserProfileForm;
