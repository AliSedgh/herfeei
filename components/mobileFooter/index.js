import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../pages/_app";
import MobileFooterItem from "../mobileFooterItem";
import HomeIcon from "./HomeIcon";
import OrdersIcon from "./OrdersIcon";
import NotifIcon from "./NofitIcon";
import ProfileIcon from "./ProfileIcon";
import DeskIcon from "./DeskIcon";
import { useUserNotifications } from "../../core/hooks/useProfileApi";

const icons = [
  {
    url: "/",
    Icon: HomeIcon,
    title: "خانه",
  },
  {
    url: "/order",
    Icon: OrdersIcon,
    title: "سفارشات",
  },
  {
    url: "/profile/notifications",
    Icon: NotifIcon,
    title: "اعلان ها",
  },
  {
    url: "/desk",
    Icon: DeskIcon,
    title: "میزکار",
  },
  {
    url: "/profile",
    Icon: ProfileIcon,
    title: "پروفایل",
  },
];

export default function MobileFooter() {

  const [notificationList, setNotificationList] = useState([]);
  const {
    data: notifications,
    isLoading,
    refetch,
    isError,
  } = useUserNotifications();

  useEffect(() => {
    if (notifications && !notifications?.detail) {
      setNotificationList(notifications);
    }
  }, [notifications]);
  console.log("noooo", notificationList);
  // const isIOS = () => {
  //   return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  // };
  //${isIOS() ? "standalone:pb-[20px]" : ""}
  //pb-safe-bottom

  const renderItem = (notificationList) => {


    return (
      <>
        {icons.map((item, i) => (
          <MobileFooterItem
            key={i}
            {...item}
            notifications={notificationList}
          />
        ))}
      </>
    );
  };

  return (
    <footer
      className={`padding-b-ios bg-white pt-1 px-2 w-full flex justify-around items-center fixed bottom-0 left-0 right-0 shadow-[0px_0px_31.4px_0px_rgba(4,6,15,0.15)] max-h-[83px] z-50`}
    >
      {renderItem(notificationList)}
    </footer>
  );
}
