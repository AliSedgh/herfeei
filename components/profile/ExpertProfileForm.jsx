import React, { useState, useEffect, useContext, useRef } from "react";
import RTLTextField from "../RTLTextField";
import { Button, MenuItem, Select } from "@mui/material";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import EditButton from "../../core/utils/EditButton";
import { Formik } from "formik";
import jalali from "jalali-moment";
import { useRouter } from "next/router";
import { UserContext } from "../../pages/_app";
import { usePutUpdateExpert } from "../../core/hooks/useExpertApi";

const ExpertProfileForm = ({ service, initialValues }) => {
  const router = useRouter();
  const url = router.pathname;
  const putUpdateExpert = usePutUpdateExpert();
  const { setUser } = useContext(UserContext);

  const handleSubmit = (values) => {
    putUpdateExpert.mutate(values);
    setUser(values);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          handleSubmit(values);
          actions.resetForm();
          if (!service && url !== "/desk") {
            router.push("/profile");
          } else if (url === "/desk") {
            router.push("/desk");
          }
        }}
        enableReinitialize
      >
        {(props) => (
          <form form onSubmit={props.handleSubmit}>
            <div className="md:p-6 m-0 md:mt-0  rounded-xl w-full ">
              <div className="flex items-start justify-start flex-wrap">
                <RenderTextField
                  label={"نام و نام خانوادگی"}
                  name={"full_name"}
                  value={props.values?.name}
                  defaultValue={""}
                  inputProps={{}}
                  handleChange={props.handleChange}
                  url={url}
                />
                <RenderTextField
                  label={"شهر"}
                  name={"city"}
                  value={props.values?.city.name}
                  defaultValue={""}
                  inputProps={{}}
                  handleChange={props.handleChange}
                  url={url}
                />
                <RenderTextField
                  label={"شماره موبایل"}
                  name={"name"}
                  value={"0".concat(props.values?.user?.username)}
                  defaultValue={""}
                  inputProps={{}}
                  handleChange={props.handleChange}
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

// const RenderDatePicker = ({
//   label,
//   name,
//   value,
//   defaultValue,
//   setFieldValue,
//   url,
// }) => {
//   const [active, setActive] = useState(false);
//   const ref = useRef();

//   useEffect(() => {
//     active && ref.current?.focus();
//   }, [active]);
//   return (
//     <div className="flex flex-col m-2 basis-[100%] lg:basis-[46%] relative">
//       <label htmlFor={name} className="text-[#000000] mb-1">
//         {label}
//       </label>
//       <DatePicker
//         id={name}
//         inputRef={(elm) => (ref.current = elm)}
//         disabled={!active}
//         name={name}
//         calendar={persian}
//         locale={persian_fa}
//         inputClass="border hover:border-solid hover:border-[black] w-full p-[1.15rem] rounded focus:border-2 focus:outline-none focus:border-[#2E82D6]"
//         calendarPosition="bottom-right"
//         value={jalali.from(value, "fa", "YYYY/MM/DD").toDate()}
//         defaultValue={defaultValue}
//         onChange={(date) => {
//           const shamsi = jalali(new Date(date))
//             .locale("fa")
//             .format("YYYY-MM-DD");
//           setFieldValue(name, shamsi);
//         }}
//       />
//       {url !== "/desk" && (
//         <div className="absolute left-0 bottom-[30px]">
//           <EditButton
//             onClick={() => {
//               setActive(!active);
//             }}
//             active={active}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

export { ExpertProfileForm };
