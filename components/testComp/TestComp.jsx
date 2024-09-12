import React, { useState } from "react";
import { format, addDays, isToday } from "date-fns-jalali";
import { faIR } from "date-fns-jalali/locale";

const TestComp = () => {
  const today = new Date();
  const days = [];
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

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
  };

  return (
    <>
      <div className="w-full">
        <p>روز مورد نظر خود را برای خدمت انتخاب کنید:</p>
        <div className="w-full grid lg:flex gap-2 justify-center justify-items-center lg:justify-items-start lg:justify-start grid-cols-2 3xs:grid-cols-3 ss:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 text-center">
          {days.map((day, index) => (
            <div
              key={index}
              className={`w-[109px] h-[103px] bg-[#F9F9F9] flex flex-col text-center justify-center items-center gap-3 rounded-lg hover:[border:1px_solid_#0361FF] hover:text-[#0361FF] duration-300 cursor-pointer ${
                selectedIndex === index
                  ? "[border:1px_solid_#0361FF] text-[#0361FF]"
                  : "[border:1px_solid_#EBEBEB] text-[#212121]"
              }`}
              onClick={() => handleClick(day.date, index)}
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
    </>
  );
};

export { TestComp };
