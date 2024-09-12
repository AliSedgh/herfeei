import React, { useEffect, useState } from "react";
import ServiceLayout from "../../components/layouts/service-layout";
import BreadCrumb from "../../components/breadCrumb";
import { useRouter } from "next/router";
import jalaliMoment from "jalali-moment";
import { usePostServiceTime } from "../../core/hooks/useServiceApi";
import { toast } from "react-toastify";
import { MultiStepProgressBar } from "../../components/multiStepProgressBar/MultiStepProgressBar";
import { format, addDays, isToday, isAfter } from "date-fns-jalali";
import { faIR } from "date-fns-jalali/locale";
import { motion } from "framer-motion";

const SelectDay = ({
  handleDayChange,
  selectedDay,
  handleTimeChange,
  selectedTime,
}) => {
  const times = [
    "8 الی 9 ",
    "9 الی 10 ",
    "10 الی 11",
    "11 الی 12",
    "12 الی 13",
    "13 الی 14",
    "14 الی 15",
    "15 الی 16",
    "16 الی 17",
    "17 الی 18",
    "18 الی 19",
    "19 الی 20",
    "20 الی 21",
    "21 الی 22",
    "22 الی 23",
  ];

  const today = new Date();
  const days = [];

  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(null);
  const [todayChecked, setTodayChecked] = useState(false);
  const oId = localStorage.getItem("order_id");
  const aId = localStorage.getItem("address_id");
  const postData = {
    order_id: oId,
    address_id: aId,
    date: selectedDate,
    time: selectedTimes,
  };
  const postServiceTime = usePostServiceTime();
  console.log("bq", selectedTimes);
  console.log("aq", selectedDate);
  const router = useRouter();

  useEffect(() => {
    setSelectedIndex(null);
    handleTimeCheckboxChange("now");
    setSelectedDate("now");
  }, []);

  const handleTimeCheckboxChange = (time, index) => {
    // If the selected time is already in the list, remove it
    // if (selectedTimes.includes(time)) {
    //   setSelectedTimes((prev) =>
    //     prev.filter((prevTime) => prevTime !== time).replace(/ الی /g, "-")
    //   );
    // } else {
    //   // If a new time is selected, clear the selection for other times
    //   setSelectedTimes(time.replace(/ الی /g, "-"));
    // }
    setSelectedTimeIndex(index);
    setSelectedTimes(time.replace(/ الی /g, "-"));
  };

  for (let i = 0; i < 6; i++) {
    const day = addDays(today, i);
    const dayName = format(day, "EEEE", { locale: faIR });
    const dayDate = format(day, "d MMMM", { locale: faIR });

    days.push({ dayName, dayDate, isToday: isToday(day), date: day });
  }

  const formatWithLeadingZero = (num) => (num < 10 ? `0${num}` : num);

  const handleClick = (date, index) => {
    const formattedDate = `${date.getFullYear()}-${formatWithLeadingZero(
      date.getMonth() + 1
    )}-${date.getDate()}`;
    setSelectedDate(formattedDate);
    setSelectedIndex(index);
    console.log("datedate", formattedDate);
  };

  // console.log("fdfd",nextDayDateSend)

  const breadcrumbPaths = [
    { label: "حرفه ای", link: "/" },
    { label: "سرویس ها", link: "/services" },
    { label: "سوالات", link: "/services" },
    { label: "توضیحات", link: "/services" },
    { label: "انتخاب سفارش دهنده", link: "/services" },
    { label: "اطلاعات کاربری", link: "/services" },
    { label: "آدرس", link: "/services" },
    { label: "زمان", link: "/services" },
  ];

  const buttonVariants = {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 0 },
  };

  const submitHandler = async (data) => {
    if (selectedTimes.length === 0 && selectedDate == null) {
      toast.error("لطفا تاریخ و زمان را انتخاب کنید");
    } else if (selectedTimes.length === 0) {
      toast.error("لطفا یک واحد زمانی را انتخاب کنید");
    } else if (selectedDate == null) {
      toast.error("لطفا تاریخ را انتخاب کنید");
    } else {
      postServiceTime.mutate(data, {
        onSuccess: (res) => {
          if (res?.status === 200) {
            router.push("/services/select-expert");
            // toast.success("عالی");
          } else {
            toast.error(res?.message);
          }
          // router.push("/services/select-expert");
          // console.log("resaq",res)
        },
      });
    }

    // if (selectedTimes.length !== 0 && selectedDate != null) {
    //   postServiceTime.mutate(data);
    //   router.push("/services/select-expert");
    // } else {
    //   toast.error("لطفا تاریخ و زمان را انتخاب کنید");
    // }
  };

  return (
    <>
      <div className="w-full m-0 p-0 pb-[120px]">
        <div className="hidden md:block">
          <BreadCrumb paths={breadcrumbPaths} />
        </div>
        <MultiStepProgressBar step={6} />
        <div className="w-full relative pt-[70px]">
          <div className="w-full mb-13">
            <p className="mt-10 mb-7 font-bold">
              روز مورد نظر خود را برای خدمت انتخاب کنید:
            </p>
            <div className="w-full grid lg:flex gap-2 justify-center justify-items-center lg:justify-items-start lg:justify-start grid-cols-2 3xs:grid-cols-3 ss:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 text-center">
              {days.map((day, index) => (
                <div
                  key={index}
                  className={`w-[109px] h-[103px] bg-[#F9F9F9] flex flex-col text-center justify-center items-center gap-3 rounded-lg hover:[border:1px_solid_#0361FF] hover:text-[#0361FF] duration-300 cursor-pointer ${
                    selectedIndex === index
                      ? "[border:1px_solid_#0361FF] text-[#0361FF]"
                      : "[border:1px_solid_#EBEBEB] text-[#212121]"
                  }`}
                  onClick={() => {
                    selectedTimes === "now" && setSelectedTimeIndex(null);
                    selectedTimes === "now" && setSelectedTimes("");
                    handleClick(day.date, index);
                    day.isToday
                      ? setTodayChecked(true)
                      : setTodayChecked(false);
                  }}
                >
                  <div>
                    <div className="text-[16px] font-bold">{day.dayName}</div>
                    {day.isToday && (
                      <div className="text-[12px] font-normal">(امروز)</div>
                    )}
                  </div>
                  <div className="text-[14px] font-semibold">{day.dayDate}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-bold  mb-7">ساعت مورد نظر:</p>
            <form onSubmit={submitHandler}>
              <div className="grid mx-auto md:mx-0 gap-3 grid-cols-2 md:grid-cols-5  lg:w-[80%]">
                {times.map((time, index) => {
                  // Convert the time string to a Date object for comparison
                  const timeDate = jalaliMoment(time, "HH:mm").toDate();

                  // Check if the time has already passed
                  const isTimePassed = isAfter(new Date(), timeDate);

                  return (
                    <>
                      <label
                        htmlFor={`time-${index}`}
                        key={index}
                        className={`flex hover:[border:1px_solid_#0361FF] rounded-[16px] h-[72px] !text-[14px] font-bold  items-center justify-between flex-1 mr-2 mb-2   p-2 py-4 hover:bg-[#B3D0FF] cursor-pointer text-bold ${
                          todayChecked == true || selectedDate == null
                            ? isTimePassed && "opacity-50 cursor-not-allowed"
                            : ""
                        } ${
                          selectedTimeIndex === index
                            ? "[border:1px_solid_#0361FF] bg-[#B3D0FF]"
                            : "[border:1px_solid_#EBEBEB] bg-[#F9F9F9]"
                        }`}
                      >
                        <p className="m-0 p-0">{time}</p>
                        <input
                          type="checkbox"
                          id={`time-${index}`}
                          name={`time-${index}`}
                          value={time}
                          checked={selectedTimes.includes(
                            time.replace(/ الی /g, "-")
                          )}
                          onChange={() => handleTimeCheckboxChange(time, index)}
                          disabled={
                            todayChecked == true || selectedDate == null
                              ? isTimePassed
                              : false
                          }
                        />
                      </label>
                    </>
                  );
                })}

                <label
                  htmlFor={`time`}
                  className={`absolute top-0 right-0 w-[200px] flex hover:[border:1px_solid_#0361FF] rounded-[16px] h-[72px] !text-[14px] font-bold  items-center justify-between flex-1 mr-2 mb-2   p-2 py-4 hover:bg-[#B3D0FF] cursor-pointer text-bold ${
                    selectedTimes.includes("now")
                      ? "[border:1px_solid_#0361FF] bg-[#B3D0FF]"
                      : "[border:1px_solid_#EBEBEB] bg-white"
                  }`}
                >
                  <p className="m-0 p-0">همین الان</p>
                  <input
                    type="checkbox"
                    id={`time`}
                    name={`time`}
                    value={"now"}
                    checked={selectedTimes.includes("now")}
                    onChange={() => {
                      setSelectedIndex(null);
                      handleTimeCheckboxChange("now");
                      setSelectedDate("now");
                    }}
                  />
                </label>
              </div>
            </form>
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
            router.push("/services/select-address");
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
            submitHandler(postData);
          }}
        >
          ادامه
        </motion.button>
      </div>
    </>
  );
};

export default SelectDay;
