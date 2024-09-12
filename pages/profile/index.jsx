import React, { useContext, useState } from "react";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { CityContext, UserContext } from "../_app";
import Banner from "../../components/banner";
import { useRouter } from "next/router";
import ProfileMenuItem from "../../components/profileMenuItem";
import Image from "next/image";
import Button from "@mui/material/Button";
import { Drawer } from "@mui/material";
import useWindowWidth from "../../core/utils/useWindowWidth";
import ProfileHeader from "../../components/profileHeader";

export default function Index({ children }) {
  const windowWidth = useWindowWidth();
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const { setUser } = useContext(UserContext);
  const { setCity } = useContext(CityContext);
  const [list, setList] = useState([
    {
      title: "ویرایش اطلاعات کاربری",
      imageSrc: "/icons/Profile.svg",
      link: "/profile/edit",
    },
    {
      title: "لیست تراکنش",
      imageSrc: "/icons/receipt.svg",
      link: "/profile/transactions",
    },
    {
      title: "آدرس های من",
      imageSrc: "/icons/location.svg",
      link: "/profile/addresses",
    },
    {
      title: "پشتیبانی",
      imageSrc: "/icons/support.svg",
      link: "/profile/support",
    },
    // {
    //   title: "معرفی به دوستان",
    //   imageSrc: "/icons/add-user.svg",
    //   imageBgColor: "#0361FF",
    //   link: "/profile/referrals",
    // },
    // {
    //   title: "متخصصین منتخب",
    //   imageSrc: "/icons/star.svg",
    //   link: "/profile/experts",
    // },
    // {
    //   title: "پیام‌ها",
    //   imageSrc: "/icons/notif.svg",
    //   link: "/profile/notifications",
    // },
    {
      title: "گارانتی",
      imageSrc: "/icons/guarantee.svg",
      link: "/profile/guarantee",
    },
    // {
    //   title: "کلاب",
    //   imageSrc: "/icons/club.svg",
    //   link: "/profile/club",
    // },
    {
      title: "راهنمای استفاده",
      imageSrc: "/icons/guide.svg",
      link: { pathname: "/profile/guide", query: { param: "faqs" } },
      footerItem: true,
    },
    {
      title: "قوانین و مقررات",
      imageSrc: "/icons/rules.svg",
      link: "/profile/rules",
      footerItem: true,
    },
  ]);

  const handleLogout = () => {
    router.push("/");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("address_id");
    window.localStorage.clear();
    localStorage.clear();
    setUser(null);
    setCity(null);
    window.location.replace("/");
  };

  return (
    <div className="bg-[#F4F6FA] overflow-hidden md:pb-[70px]">
      <ProfileHeader />
      <div className="flex gap-2 px-2">
        <div className="flex flex-col gap-1 rounded-xl mt-[1rem] w-full md:w-auto min-w-[35%] md:min-w-[40%] lg:min-w-[35%] xl:min-w-[30%]">
          {list.slice(0, 4).map((item, i) => (
            <ProfileMenuItem key={i} {...item}>
              {windowWidth < 768 && (
                <div className="mb-4">
                  <Banner />
                </div>
              )}
            </ProfileMenuItem>
          ))}
          <div className="w-full md:hidden">
            <Banner />
          </div>
          {list.slice(4).map((item, i) => (
            <ProfileMenuItem key={i} {...item}>
              {windowWidth < 768 && (
                <div className="mb-4">
                  <Banner />
                </div>
              )}
            </ProfileMenuItem>
          ))}

          <div
            onClick={() => setShowConfirm(true)}
            className="flex bg-white items-center justify-between ml-1 rounded-lg mb-1 cursor-pointer"
          >
            <div className="m-[.3rem] rounded-xl flex items-center">
              <Image
                className="bg-[#F9B6B6] rounded-lg p-[.4rem] m-3"
                src="/icons/logout.svg"
                width={32}
                height={32}
                alt="icon"
              />
              <p className="mt-2 mb-0 text-[#1A1D1F] text-base font-bold">
                خروج از حساب کاربری
              </p>
            </div>
          </div>
        </div>
        {children ? (
          children
        ) : (
          <div className="p-6 m-2 md:m-0 md:mt-4 bg-white rounded-xl min-w-[60%] md:w-full hidden md:flex md:justify-center md:items-center">
            <Image
              className="rounded-lg"
              src="/images/profile-bg.svg"
              alt="edit icon"
              width={400}
              height={400}
            />
          </div>
        )}
      </div>

      {windowWidth >= 768 && (
        <div className="mb-4">
          <Banner />
        </div>
      )}

      <Drawer
        transitionDuration={500}
        anchor="bottom"
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        PaperProps={{
          sx: { borderTopRightRadius: "2rem", borderTopLeftRadius: "2rem" },
        }}
      >
        <div className="flex flex-center flex-col p-6 items-center truncate ">
          <h1 className="text-[#F75555]">خروج از حساب کاربری</h1>
          <p>آیا خروج از حساب کاربری مطمئن هستید؟</p>
          <div className="flex justify-center items-center ">
            <Button
              sx={{ margin: 1 }}
              variant="contained"
              onClick={handleLogout}
            >
              بله، خارج می شوم
            </Button>
            <Button
              sx={{ margin: 1 }}
              onClick={() => setShowConfirm(false)}
              // autoFocus
              variant="outlined"
            >
              انصراف
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
