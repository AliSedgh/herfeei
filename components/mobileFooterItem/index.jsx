import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import React, { useEffect } from "react";
import { useContext } from "react";
import { usePathname } from "next/navigation";
import { UserContext } from "../../pages/_app";
import { useRouter } from "next/router";
import { useGetNotifacations } from "../../core/hooks/useExpertApi";
import { useUserNotifications } from "../../core/hooks/useProfileApi";

const selected = "#0361FF";
const notSelected = "#999BA7";
const active = true;
const notActive = false;

export default function MobileFooterItem(props) {
  const { url, title, Icon, notifications } = props;
  const router = useRouter();
  const { user, setShowLogin, showLogin } = useContext(UserContext);
  const isDeskPage = router.pathname.startsWith("/desk");
  const isExpertSignUpPage = router.pathname.startsWith("/expert-sign-up");
  const isOrderPage = router.pathname.startsWith("/order");
  const isNotificationPage = router.pathname.startsWith(
    "/profile/notifications"
  );
  const isProfilePage = router.pathname.startsWith("/profile");
  const pathname = usePathname();
  const userRole = localStorage.getItem("user_role");
  console.log("data", notifications);

  const handleNavigate = () => {
    if (!user) {
      if (url !== "/" && url !== "/desk") {
        setShowLogin(true);
      } else {
        if (title === "میزکار") {
          if (user && userRole === "EXPERT") {
            router.push("/desk");
          } else {
            router.push("/expert-sign-up");
          }
        } else {
          router.push(url);
        }
      }
    } else {
      if (title === "میزکار") {
        if (user && userRole === "EXPERT") {
          router.push("/desk");
        } else {
          router.push("/expert-sign-up");
        }
      } else {
        router.push(url);
      }
    }
  };

  return (
    <div
      onClick={handleNavigate}
      className="cursor-pointer flex flex-col pb-[4px] relative justify-center items-center"
    >
      <Icon
        fill={
          (title === "میزکار" && userRole === "EXPERT" && isDeskPage) ||
          (title === "میزکار" && userRole !== "EXPERT" && isExpertSignUpPage) ||
          (title === "سفارشات" && isOrderPage) ||
          (title === "اعلان ها" && isNotificationPage) ||
          (title === "پروفایل" && isProfilePage) ||
          (title === "خانه" && pathname === "/")
            ? active
            : notActive
        }
      />
      <p
        className="unselectable-text text-sm m-1 select-none"
        style={
          (title === "میزکار" && userRole === "EXPERT" && isDeskPage) ||
          (title === "میزکار" && userRole !== "EXPERT" && isExpertSignUpPage) ||
          (title === "سفارشات" && isOrderPage) ||
          (title === "اعلان ها" && isNotificationPage) ||
          (title === "پروفایل" && isProfilePage) ||
          (title === "خانه" && pathname === "/")
            ? { color: selected, fontWeight: "700" }
            : { color: notSelected }
        }
      >
        {title === "اعلان ها" &&
          notifications &&
          notifications?.filter((item) => item?.status !== "READ")?.length >
            0 && (
            <div className="w-5 h-5 flex items-center justify-center absolute -top-1 right-2 rounded-full bg-red-500 text-white">
              <span className="text-[10px]">
                {
                  notifications?.filter((item) => item.status !== "READ")
                    ?.length
                }
              </span>
            </div>
          )}
        {title}
      </p>
    </div>
  );
}
