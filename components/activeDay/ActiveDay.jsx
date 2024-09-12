import { Button, FormLabel } from "@mui/material";
import ActivateSwitch from "../switch/Switch";
import jalaliMoment from "jalali-moment";
import { useFormik } from "formik";
import {
  useGetNotAvailableTime,
  usePutNotAvailableTime,
} from "../../core/hooks/useExpertApi";
import { useEffect, useState } from "react";

const ActiveDay = () => {
  const {
    data: getNotAvailableData,
    loading,
    refetch,
  } = useGetNotAvailableTime();
  const putNotAvailable = usePutNotAvailableTime();
  const [initValues, setInitValues] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
  ]);

  const checkDate = (index) => {
    let flag = false;
    const jalaliDate = jalaliMoment().add(index, "day").format("YYYY-MM-D");
    const myArray = getNotAvailableData?.map(
      (myDate) => myDate.date !== jalaliDate
    );
    flag = myArray?.includes(false);
    return !flag;
  };

  useEffect(() => {
    const newState = initValues.map((data, index) => checkDate(index));
    setInitValues(newState);
  }, [getNotAvailableData, loading]);

  const convertToPersian = (type, value) => {
    const dayMap = {
      Saturday: "شنبه",
      Sunday: "یکشنبه",
      Monday: "دوشنبه",
      Tuesday: "سه شنبه",
      Wednesday: "چهارشنبه",
      Thursday: "پنجشنبه",
      Friday: "جمعه",
    };

    const monthMap = {
      January: "دی",
      February: "بهمن",
      March: "اسفند",
      April: "فروردین",
      May: "اردیبهشت",
      June: "خرداد",
      July: "تیر",
      August: "مرداد",
      September: "شهریور",
      October: "مهر",
      November: "آبان",
      December: "آذر",
    };

    if (type === "day") {
      return dayMap[value] || value;
    } else if (type === "month") {
      return monthMap[value] || value;
    } else if (type === "year") {
      const farsiYear = jalaliMoment(value, "YYYY").format("jYYYY");
      return farsiYear;
    }

    return value;
  };

  const nextDays = Array.from({ length: 6 }, (_, index) => {
    const nextDay = jalaliMoment().add(index, "day");
    const nextDayName = nextDay.format("dddd");
    const nextDayDate = nextDay.format("DD MMMM YYYY");
    const persianMonth = convertToPersian("month", nextDayDate.split(" ")[1]);
    const persianDayWeek = convertToPersian("day", nextDayName);
    const persianDay = jalaliMoment(nextDayDate, "DD MMMM YYYY").format("jD");
    return {
      dayWeek: persianDayWeek,
      date: `${persianMonth} ${persianDay}`,
    };
  });

  const formik = useFormik({
    initialValues: initValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      const toDate = values
        .map((value, index) =>
          value ? "" : jalaliMoment().add(index, "day").format("YYYY-MM-D")
        )
        .filter((value) => value !== "")
        .toString();
      if (values?.includes(false)) {
        putNotAvailable.mutate(toDate);
      } else {
        putNotAvailable.mutate();
      }

      refetch();
    },
  });

  return (
    <div className="w-full rounded-md bg-white flex flex-col items-center gap-10">
      <h3 className="w-full text-center text-neutral-800 text-sm sm:text-base font-semibold leading-snug">
        روزهای فعال بود خود را برای 6 روز آینده مشخص کنید
      </h3>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex flex-col items-center gap-10"
      >
        <div className="w-full flex gap-4 justify-center flex-wrap ">
          {nextDays.map((day, index) => (
            <div
              key={index}
              className="w-full 2xs:w-[45%] sm:w-[30%] md:w-[31%] lg:w-auto flex flex-col justify-center items-center gap-1"
            >
              <FormLabel
                htmlFor={index}
                className={`${
                  index === 0
                    ? "[border:1px_solid_rgb(37_99_235)]"
                    : "[border:1px_solid_rgb(38_38_38)] "
                } h-[103px] p-3 bg-white rounded-lg flex-col justify-center items-center gap-3 inline-flex cursor-pointer`}
              >
                <div className="flex flex-col gap-3">
                  <div
                    className={`${
                      index === 0 ? "text-blue-600" : "text-neutral-800"
                    } flex flex-col items-center justify-center  `}
                  >
                    <span className="text-base font-bold leading-snug">
                      {day.dayWeek}
                    </span>
                    {index === 0 && (
                      <span className="text-xs font-normal leading-[18px]">
                        (امروز)
                      </span>
                    )}
                  </div>
                  <div className="w-full text-center">
                    <span
                      className={`${
                        index === 0 ? "text-blue-600" : "text-neutral-800"
                      } text-sm font-semibold leading-tight flex`}
                    >
                      {day.date}
                    </span>
                  </div>
                </div>
              </FormLabel>
              <ActivateSwitch
                checked={formik.values[index]}
                value={formik.values[index]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name={`${index}`}
                id={`${index}`}
              />
            </div>
          ))}
        </div>
        <Button
          className=" h-9 px-4 py-2 bg-blue-600 hover:bg-blue-800 rounded-lg justify-center items-center inline-flex text-right text-white text-sm font-semibold leading-tight"
          onClick={formik.handleSubmit}
        >
          ذخیره تغییرات
        </Button>
      </form>
    </div>
  );
};

export default ActiveDay;
