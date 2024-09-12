import Image from "next/image";
import clock from "../../public/icons/clock-in-notif.svg";
import info from "../../public/icons/info-notif.svg";
import { Check } from "@mui/icons-material";
import moment from "jalali-moment";

const StatusNotification = ({ data }) => {
  const todayDate = moment(new Date(), "en", "mmmmm")
    .locale("fa")
    .format("DD-MM-YYYY")
    .replace("-", " ")
    .replace("-", " ");
  const notifDate = moment(new Date(data?.updated_at), "en", "mmmmm")
    .locale("fa")
    .format("DD-MM-YYYY")
    .toString()
    .replace("-", " ")
    .replace("-", " ");

  const notifTime = moment(new Date(data?.updated_at), "en", "mmmmm")
    .locale("fa")
    .format("HH-mm")
    .toString()
    .replace("-", ":");

  const [todayDay, todayMonth, todayfYear] = todayDate.split(" ");
  const [notifDay, notifMonth, notifYear] = notifDate.split(" ");
  return (
    <div className="w-full px-2 sm:px-6 py-2 sm:py-4 bg-white sm:bg-stone-50 rounded-2xl [border:1px_solid_#EBEBEB] flex gap-4 items-center">
      <div>
        {data?.notification?.level === "INFO" ? (
          <div className="p-1 sm:p-3 w-8 h-8 sm:w-12 sm:h-12 bg-blue-600/10 rounded-xl flex justify-center items-center">
            <div className="relative w-full h-full">
              <Image src={clock} alt="clock" fill />
            </div>
          </div>
        ) : data?.notification?.level === "SUCCESS" ? (
          <div className="p-1 sm:p-3 w-8 h-8 min-w-8 min-h-8 sm:w-12 sm:h-12 bg-green-500/10 rounded-xl flex justify-center items-center">
            <Check className="w-full h-full text-green-600" />
          </div>
        ) : data?.notification?.level === "WARNING" ? (
          <div className="p-1 sm:p-3 w-8 h-8 sm:w-12 sm:h-12 bg-amber-500/10 rounded-xl flex justify-center items-center">
            <div className="relative w-full h-full">
              <Image src={info} alt="info" fill />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div dir="rtl" className="flex flex-col gap-[6px]">
        <p className="p-0 m-0 text-right text-black text-xs 2xs:text-sm sm:text-base font-normal leading-normal">
          {data?.notification?.description}
        </p>
        <span className="text-neutral-400 text-xs font-normal leading-normal">
          {notifTime}{" "}
          {todayfYear > notifYear
            ? todayfYear - notifYear + " " + "سال پیش"
            : todayMonth > notifMonth
            ? todayMonth - notifMonth + " " + "ماه پیش"
            : todayDay > notifDay
            ? todayDay - notifDay + " " + "روز گذشته"
            : ""}
        </span>
      </div>
    </div>
  );
};

export { StatusNotification };
