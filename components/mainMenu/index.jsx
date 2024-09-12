import React, { useEffect, useContext, useState } from "react";
import {
  Menu as ReactMenu,
  MenuItem as ReactMenuItem,
  SubMenu,
} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import ArrowIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { CityContext, UserContext } from "../../pages/_app";
import { useRouter } from "next/router";
import Link from "next/link";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import {
  Divider,
  Drawer,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import Search from "../search";
import Button from "@mui/material/Button";
import MainMenuItem from "../mainMenuItem";
import { useGetServicesCategories } from "../../core/hooks/useServiceApi";
import Icon1 from "../../public/icons/ump1.svg";
import Icon2 from "../../public/icons/ump2.svg";
import Icon3 from "../../public/icons/ump3.svg";
import Icon4 from "../../public/icons/ump4.svg";
import Icon5 from "../../public/icons/ump5.svg";
import Icon6 from "../../public/icons/ump6.svg";
import Icon7 from "../../public/icons/ump7.svg";
import Icon8 from "../../public/icons/ump8.svg";
import Icon9 from "../../public/icons/ump9.svg";
import Icon10 from "../../public/icons/ump10.svg";
import Icon11 from "../../public/icons/ump11.svg";
import AboutUsIcon from "../../public/icons/aboutUsIcon.svg";
import NavBarLogo from "../../public/images/navBarLogo1.png";
import DefaultProfileSvg from "../../public/icons/avatar-deafult.svg";
import { useGetProfileAvatar } from "../../core/hooks/useProfileApi";
import { useSearchParams } from "next/navigation";

const services = [
  {
    id: "",
    title: "",
  },
];

const userMenuPopOverItems = [
  {
    id: 1,
    title: "پروفایل کاربری",
    link: "/profile",
    icon: Icon1.src,
  },
  {
    id: 2,
    title: "همه سرویس ها",
    link: "/services",
    icon: Icon2.src,
  },
  {
    id: 3,
    title: "سفارشات من",
    link: "/order",
    icon: Icon3.src,
  },
  {
    id: 4,
    title: "میزکار",
    icon: Icon4.src,
  },
  {
    id: 5,
    title: "تماس با ما",
    link: "/profile/support",
    icon: Icon5.src,
  },
  {
    id: 6,
    title: "معرفی به دوستان",
    link: "/profile/referrals",
    icon: Icon6.src,
    style: "[border-bottom:1px_solid_#EFEFEF]",
  },
  {
    id: 7,
    title: "وبلاگ",
    link: "https://blog.herfeei.com",
    icon: Icon7.src,
  },
  {
    id: 8,
    title: "شرایط و قوانین",
    link: "/profile/rules",
    icon: Icon8.src,
  },
  {
    id: 9,
    title: "پشتیبانی",
    link: "/profile/support",
    icon: Icon9.src,
    style: "[border-bottom:1px_solid_#EFEFEF]",
  },
  {
    id: 10,
    title: "دانلود اپلیکیشن",
    link: "/",
    icon: Icon10.src,
  },
  {
    id: 11,
    title: "درباره ما",
    link: "/about-us",
    icon: AboutUsIcon.src,
  },
  {
    id: 12,
    title: "خروج از حساب کاربری",
    link: "/",
    icon: Icon11.src,
    style: "text-[#DB2B24]",
    onClick: () => setShowConfirm(true),
  },
];

export default function MainMenu() {
  const router = useRouter();
  const { user, userPhone, setShowLogin, showLogin, setUser } =
    useContext(UserContext);

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [servicesCategories, setServicesCategories] = useState(services);
  const [showConfirm, setShowConfirm] = useState(false);

  const [list, setList] = useState([
    {
      title: "همه سرویس ها",
      imageSrc: "/icons/main-menu-services.svg",
      link:
        router.pathname == "/services"
          ? "https://herfeei.com/services"
          : "/services",
    },
    {
      title: "ثبت نام متخصص",
      imageSrc: "/icons/main-menu-register.svg",
      link: "/expert-sign-up",
    },
    {
      title: "تماس با ما",
      imageSrc: "/icons/main-menu-call.svg",
      link: "/profile/support",
    },
    {
      title: "معرفی به دوستان",
      imageSrc: "/icons/main-menu-referal.svg",
      link: "/profile/referrals",
    },
    {
      title: "وبلاگ",
      imageSrc: "/icons/main-menu-blog.svg",
      link: "https://blog.herfeei.com",
    },
    {
      title: "پشتیبانی",
      imageSrc: "/icons/main-menu-support.svg",
      link: "/profile/support",
    },
    {
      title: "درباره ما",
      imageSrc: "/icons/aboutUsIcon.svg",
      link: "/about-us",
    },
    // {
    //   id: 11,
    //   title: "خروج از حساب کاربری",
    //   link: "/",
    //   icon: Icon11.src,
    //   style: "text-[#DB2B24]",
    //   onClick: () => setShowConfirm(true),
    // },
  ]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userName, setUserName] = useState(null);

  const searchParams = useSearchParams();
  const inviter = searchParams.get("inviter");
  const { setCity } = useContext(CityContext);

  const { data: getProfileAvatarData, isLoading: getProfileAvatarIsLoading } =
    useGetProfileAvatar();
  const serviceQuery = useGetServicesCategories();
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

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (inviter) {
      setShowLogin(true);
      setUser(null);
      localStorage.clear();
    }
  }, [searchParams]);

  const handleChangeState = (newState) => {
    setOpen(newState);
  };

  useEffect(() => {
    serviceQuery?.data && setServicesCategories(serviceQuery?.data);
    setIsLoading(false);
  }, [serviceQuery?.data]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("user_name") !== null
    ) {
      setUserName(localStorage.getItem("user_name"));
    }
  }, [
    typeof window !== "undefined",
    typeof window !== "undefined" && userName == null && userName,
  ]);

  function handleMenuClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const renderMenuItems = (items, parentPath = "") => {
    return items?.map((item, index) => {
      // Construct the path for this item, including its parent's path
      const itemPath = `${item.title}/${parentPath}`;

      return (
        <div className="flex justify-between items-center" key={item._id}>
          <ReactMenuItem>
            <Link href={itemPath} className="flex justify-between items-center">
              {item.icon && (
                <Image
                  src={`/icons/${item.icon}.svg`}
                  alt={item.title}
                  width={40}
                  height={40}
                  className="m-2"
                />
              )}
              {item.title}
            </Link>
          </ReactMenuItem>
          {item.children && item.children.length > 0 ? (
            <SubMenu
              arrow={true}
              direction="left"
              label={<ArrowIcon />}
              // openTrigger="clickOnly"
            >
              {renderMenuItems(item.children, itemPath)}
            </SubMenu>
          ) : (
            ""
          )}
        </div>
      );
    });
  };

  const renderUserMenu = () => {
    if (user) {
      return (
        <>
          <MenuItem
            sx={{ borderRadius: "2rem", padding: "0 .8rem" }}
            onClick={handleMenuClick}
          >
            <Image
              className="ml-2 !bg-[#F9F9F9] rounded-lg p-[.4rem]"
              src="/icons/Profile.svg"
              alt="profile icon"
              width={32}
              height={32}
            />
            {user?.full_name || user?.user.username
              ? user?.full_name || "0" + user?.user.username
              : userPhone && userPhone !== null
              ? "0" + userPhone
              : userName && userName !== null && "0" + userName}
            {/* {user?.full_name || "0" + user?.user.username} */}
          </MenuItem>
          <UserMenuPopOver anchorEl={anchorEl} handleClose={handleClose} />
        </>
      );
    } else {
      return (
        <MenuItem
          sx={{ borderRadius: "2rem", padding: "0 .8rem" }}
          onClick={() => setShowLogin(!showLogin)}
        >
          <Image
            className="ml-2 !bg-[#F9F9F9] rounded-lg p-[.4rem]"
            src="/icons/Profile.svg"
            alt="profile icon"
            width={32}
            height={32}
          />
          {user ? user?.full_name : "ورود | عضویت"}
        </MenuItem>
      );
    }
  };

  const renderUserMenuMobile = (cb) => {
    if (user) {
      return (
        <>
          <div
            onClick={() => {
              router.push("/profile");

              cb(false);
            }}
            className="flex items-center justify-center gap-4"
          >
            <Image
              className="rounded-[50%]"
              src={
                !getProfileAvatarIsLoading && getProfileAvatarData?.data?.avatar
                  ? getProfileAvatarData?.data?.avatar
                  : DefaultProfileSvg.src
              }
              width={54}
              height={54}
              alt="profile"
            />
            <div className="flex flex-col items-center">
              <p className="mt-2 mb-0 text-[#1A1D1F] text-base font-bold">
                {user?.full_name || "کاربر جدید"}
              </p>
              <p className="mb-2 mt-0 text-[#999BA7] text-base">
                {user?.user.username
                  ? "0" + user?.user.username
                  : userPhone && userPhone !== null
                  ? "0" + userPhone
                  : userName && userName !== null && "0" + userName}
              </p>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <Button
          variant="contained"
          sx={{
            m: ".5rem",
            height: "2.25rem",
            borderRadius: ".6rem",
            width: "100%",
          }}
          onClick={() => {
            setShowLogin(!showLogin);
            setOpen(!open);
          }}
        >
          ورود/ ثبت نام{" "}
        </Button>
      );
    }
  };

  const renderServicesMenu = () => {
    return (
      <ReactMenu
        arrow={false}
        menuButton={
          <MenuItem sx={{ borderRadius: "2rem" }}>
            <Link
              href={
                router.pathname == "/services"
                  ? "https://herfeei.com/services"
                  : "/services"
              }
              className="flex items-center"
            >
              <ListItemText>سرویس‌ها</ListItemText>
            </Link>
            <span className="ml-1 flex md:ml-2">
              <ArrowIcon
                fontSize="large"
                style={{ stroke: "#ffffff", strokeWidth: 1 }}
              />
            </span>
          </MenuItem>
        }
        transition
      >
        <ul className="list-none m-0 p-3">
          {isLoading ? (
            <p>در حال بارگذاری ...</p>
          ) : (
            servicesCategories?.map((item) => (
              <li
                className="[border-bottom:1px_solid_#F5F5F5] text-[15px] text-[#00241F] py-3 pl-15"
                key={item.id}
                onClick={() => {
                  router.push({
                    pathname: "/services",
                    query: {
                      item: item.title,
                    },
                  });
                }}
              >
                <Link href={``}>
                  {" "}
                  {/* Assuming you want to link each title */}
                  <a>{item.title}</a>
                </Link>
              </li>
            ))
          )}
        </ul>
      </ReactMenu>
    );
  };

  const renderPhoneNumber = (hidable = true) => {
    return (
      <MenuItem
        sx={{
          borderRadius: "2rem",
          padding: ".5rem .5rem",
          color: "#0361FF",
          "@media (max-width: 768px)": hidable ? { display: "none" } : {},
          placeContent: "center",
        }}
      >
        <a href="tel:02191097201">021-91097201</a>
        <Image
          className="mr-2"
          src="/icons/phone.svg"
          alt="phone icon"
          width={20}
          height={20}
        />
      </MenuItem>
    );
  };

  return (
    <nav className="bg-white flex sticky top-0 z-30 lg:px-[5rem] h-[4.25rem] md:h-[5.125rem] items-center justify-between z-10 w-full  [box-shadow:0px_0px_8px_0px_rgba(97,_100,_117,_0.20)]">
      <div className="flex justify-start md:basis-[20%] -lg:hidden">
        <Link href="/" className="flex items-center justify-center">
          <MenuItem
            sx={{
              justifyContent: "end",
              alignItems: "center",
              borderRadius: ".5rem",
              padding: "0",
            }}
          >
            <div className="flex justify-center items-center -md:flex-wrap">
              <Image
                src={NavBarLogo.src}
                alt="Takhasos Niro logo"
                width={80}
                height={25}
              />
            </div>
          </MenuItem>
        </Link>

        {renderServicesMenu()}
      </div>

      <div className="mr-4 ml-3 lg:hidden cursor-pointer">
        <Image
          src="/icons/hamberger.svg"
          alt="hamberger icon"
          width={32}
          height={32}
          onClick={toggleDrawer}
        />
      </div>

      <div className="ml-4 lg:ml-10 xl:ml-[70px] flex justify-center basis-[100%] lg:basis-[53%] h-[2.75rem]">
        <Search />
      </div>

      <div className="flex justify-end lg:basis-[20%] -lg:hidden">
        {renderPhoneNumber()}
        {renderUserMenu()}
      </div>

      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        <div className="flex flex-col items-center justify-between h-screen w-[18rem] p-6">
          <div className="flex flex-col items-center mb-auto w-full">
            <Image
              className="mt-3 mb-6"
              src={NavBarLogo.src}
              alt="Takhasos Niro logo"
              width={140}
              height={42}
              quality={100}
            />
            {renderUserMenuMobile(setOpen)}
            <Divider
              sx={{
                backgroundColor: "#F6F6F6",
                height: "2px",
                margin: "0 auto",
                width: "100%",
              }}
            />

            <div className="flex flex-col">
              {list.map((item, i) => (
                <MainMenuItem
                  {...item}
                  onChangeState={handleChangeState}
                  key={i}
                />
              ))}
              {user && (
                <div
                  onClick={() => {
                    setShowConfirm(true);
                    setOpen(false);
                  }}
                  className="flex items-center mt-3 gap-1 pr-4"
                >
                  <Image width={24} height={24} alt="" src={Icon11.src} />
                  <span>خروج از حساب کاربری</span>
                </div>
              )}
            </div>
          </div>

          <div className=" mt-auto pb-2 w-full">
            <Divider
              sx={{
                backgroundColor: "#F6F6F6",
                height: "2px",
                margin: "0 auto",
                width: "100%",
              }}
            />
            {renderPhoneNumber(false)}
          </div>
        </div>
      </Drawer>
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
    </nav>
  );
}

const UserMenuPopOver = ({ anchorEl, handleClose }) => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const { setCity } = useContext(CityContext);
  const [showConfirm, setShowConfirm] = useState(false);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const userRole = localStorage.getItem("user_role");

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

  const renderItem = () => {
    return (
      <>
        {user &&
          userRole &&
          userMenuPopOverItems?.map((item) => (
            <div
              className={`${item.style} flex items-center gap-2 hover:bg-[#F9F9F9] rounded-[10px] w-full pl-[90px] pr-[10px] py-[12px] cursor-pointer`}
              key={item.id}
              onClick={() => {
                if (item.id === 11) {
                  setShowConfirm(true);
                  handleClose();
                }
                if (item.title === "میزکار") {
                  if (userRole === "EXPERT") {
                    router.push("/desk");
                  } else {
                    router.push("/expert-sign-up");
                  }
                } else {
                  router.push(item.link);
                }
                handleClose();
              }}
            >
              <div className="relative w-[24px] h-[24px] hover:scale-125 duration-300 overflow-hidden">
                <Image
                  className="object-contain"
                  src={item.icon}
                  alt={item.title}
                  fill
                />
              </div>
              <div className="text-right">{item.title}</div>
            </div>
          ))}
      </>
    );
  };

  const popoverStyles = {
    pointerEvents: "auto",
    "& .MuiPopover-paper": {
      pointerEvents: "auto",
      borderRadius: "10px", // Add border radius here
      zIndex: 99999999,
    },
  };

  return (
    <>
      <Popover
        id={id}
        open={open}
        sx={popoverStyles}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        disableRestoreFocus
      >
        <div className="w-full flex flex-col justify-center items-center p-4">
          {renderItem()}
        </div>
      </Popover>
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
    </>
  );
};
