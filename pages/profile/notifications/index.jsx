import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import { MenuItem, Select } from "@mui/material";
import { useRouter } from "next/router";
import BackButton from "../../../components/backButton";
import useWindowWidth from "../../../core/utils/useWindowWidth";
import { useUserNotifications } from "../../../core/hooks/useProfileApi";
import moment from "jalali-moment";
import { useQueryClient } from "react-query";

export default function Notifications() {
  const [sort, setSort] = useState(0);
  const router = useRouter();
  const windowWidth = useWindowWidth();

  const { data: notifications } = useUserNotifications();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (notifications) {
      queryClient.invalidateQueries("user_notifications");
    }
  }, [notifications]);
  return (
    <>
      {windowWidth > 768 ? null : <BackButton title="اعلان ها" />}
      <div className="flex flex-col pb-3 pt-6 px-2 md:m-0 md:mt-4 mx-auto bg-white rounded-xl w-[95%]">
        <div className="flex justify-end ml-8">
          <Select
            name="sort"
            label=""
            value={sort}
            variant="standard"
            sx={{
              fontSize: "12px",
              color: "#0361FF",
              "&:before": {
                borderBottom: "none", // Remove the underline
              },
              "&:after": {
                borderBottom: "none", // Remove the underline
              },
              "& .MuiSelect-icon": {
                right: "auto", // Move the arrow to the left side
                left: -20,
              },
            }}
            onChange={(e) => setSort(e.target.value)}
          >
            <MenuItem sx={{ fontSize: "12px", color: "#0361FF" }} value={0}>
              مرتب سازی بر اساس اخرین
            </MenuItem>
            <MenuItem sx={{ fontSize: "12px", color: "#0361FF" }} value={1}>
              مرتب سازی بر اساس اولین
            </MenuItem>
          </Select>
        </div>
        {notifications?.length === 0 && (
          <p className="mt-5 text-center">اعلانی موجود نیست</p>
        )}
        {notifications?.map((item, i) => (
          <Card item={item} key={i} />
        ))}
      </div>
    </>
  );
}

const Card = ({ item }) => {
  const todayDate = moment(new Date(), "en", "mmmmm")
    .locale("fa")
    .format("DD-MM-YYYY")
    .replace("-", " ")
    .replace("-", " ");
  const notifDate = moment(new Date(item?.created_at), "en", "mmmmm")
    .locale("fa")
    .format("DD-MM-YYYY")
    .toString()
    .replace("-", " ")
    .replace("-", " ");

  const notifTime = moment(new Date(item?.created_at), "en", "mmmmm")
    .locale("fa")
    .format("HH-mm")
    .toString()
    .replace("-", ":");
  const renderIcon = (x) => {
    switch (x) {
      case 1:
        return "/icons/clock.svg";
      case 2:
        return "/icons/tick.svg";
      case 3:
        return "/icons/unread.svg";
      default:
        return "/icons/clock.svg";
    }
  };

  const [todayDay, todayMonth, todayfYear] = todayDate.split(" ");
  const [notifDay, notifMonth, notifYear] = notifDate.split(" ");
  return (
    <div className="h-[6.375rem] bg-[#FAFAFA] m-2 rounded-xl border-[#EBEBEB] border-2 border-solid flex items-center p-1 cursor-pointer ">
      <Image
        className="mx-2"
        src={renderIcon(item.type)}
        alt="question icon"
        width={48}
        height={47}
      />

      <div className="flex flex-col mr-4 justify-center">
        <h1 className="text-base font-normal my-1">
          {item?.notification?.description}
        </h1>
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
